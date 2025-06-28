import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

  constructor(private prisma: PrismaService) {}

  async createOrderAndPaymentIntent(orderCode: string, amount: number) {
    const order = await this.prisma.order.create({
      data: {
        code: orderCode,
        amount,
        status: "PENDING",
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { orderCode },
      automatic_payment_methods: { enabled: true },
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return paymentIntent;
  }
}
