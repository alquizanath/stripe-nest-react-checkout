import { Injectable, Logger } from "@nestjs/common";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StripeWebhookService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  private readonly logger = new Logger(StripeWebhookService.name);

  constructor(private readonly prisma: PrismaService) {}

  async processEvent(rawBody: Buffer, sig: string) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      this.logger.error("Invalid Stripe webhook signature");
      throw err;
    }

    this.logger.log(`Received event: ${event.type}`);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderCode = paymentIntent.metadata.orderCode;

      this.logger.log(`Payment succeeded for orderCode=${orderCode}`);

      await this.prisma.order.updateMany({
        where: { code: orderCode },
        data: { status: "PAID" },
      });
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderCode = paymentIntent.metadata.orderCode;

      this.logger.warn(`Payment failed for orderCode=${orderCode}`);

      await this.prisma.order.updateMany({
        where: { code: orderCode },
        data: { status: "FAILED" },
      });
    } else {
      this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }
}
