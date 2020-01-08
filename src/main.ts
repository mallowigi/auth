import { ValidationPipe }        from '@nestjs/common';
import { NestFactory }           from '@nestjs/core';
import { AppModule }             from 'src/app.module';
import { authGrpcClientOptions } from '@mallowigi/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(authGrpcClientOptions);
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
