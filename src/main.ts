import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { TransformerInterceptor } from './utils/transformer.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformerInterceptor());

  console.log(process.env.DATABASE_URL);

  await app.listen(process.env.PORT ?? 5000);
}
await bootstrap();
