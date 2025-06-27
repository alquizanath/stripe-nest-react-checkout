import { Module } from "@nestjs/common";
import { PaymentsModule } from "./payments/payments.module";
import { StripeWebhookModule } from "./stripe-webhook/stripe-webhook.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentsModule,
    StripeWebhookModule,
    PrismaModule,
  ],
})
export class AppModule {}
