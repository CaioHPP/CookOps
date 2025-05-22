import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não permitidas
      forbidNonWhitelisted: true, // lança erro se enviar propriedades não permitidas
      transform: true, // transforma automaticamente tipos (ex: string -> number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
