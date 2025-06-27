import { Controller, Post, Req, Res, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { StripeWebhookService } from "./stripe-webhook.service";

@Controller("webhooks/stripe")
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);

  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers["stripe-signature"] as string;
    try {
      await this.stripeWebhookService.processEvent(req.body, sig);
      res.status(HttpStatus.OK).send({ received: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      this.logger.error(`Webhook error: ${errorMessage}`);
      res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${errorMessage}`);
    }
  }
}
