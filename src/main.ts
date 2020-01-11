import { AppModule }      from '@mallowigi/auth/src/app.module';
import { authGrpcClient } from '@mallowigi/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(authGrpcClient);
  app.useGlobalPipes(
    new ValidationPipe({
      transform:            true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

bootstrap();
