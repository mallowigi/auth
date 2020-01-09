import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import { Transport }      from '@nestjs/microservices';
import { join }           from 'path';
import { AppModule }      from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options:   {
      url:       '0.0.0.0:50051',
      package:   'service',
      protoPath: join(__dirname, '../../common/proto/auth/service.proto'),
    },
  });
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
