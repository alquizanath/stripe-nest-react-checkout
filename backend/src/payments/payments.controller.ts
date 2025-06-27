import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("create-intent")
  async createPaymentIntent(
    @Body() body: { orderCode: string; amount: number }
  ) {

    const paymentIntent = await this.paymentsService.createOrderAndPaymentIntent(
      body.orderCode,
      body.amount
    );
    return { clientSecret: paymentIntent.client_secret };
  }
}
