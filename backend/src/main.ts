import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import bodyParser from "body-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

  const configService: ConfigService<Record<string, unknown>, true> = app.get(
    ConfigService
  );

  const corsOrigin = configService.get("CORS_ORIGIN");

  app.enableCors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    origin: corsOrigin ? corsOrigin.split(",") : [],
  });

  app.use("/webhooks/stripe", bodyParser.raw({ type: "application/json" }));

  await app.listen(3001);
  console.log(`🚀 Backend running on http://localhost:3001`);
}

bootstrap();
