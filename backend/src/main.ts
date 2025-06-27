import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  app.use("/webhooks/stripe", bodyParser.raw({ type: "application/json" }));

  await app.listen(3001);
  console.log(`🚀 Backend running on http://localhost:3001`);
}

bootstrap();
