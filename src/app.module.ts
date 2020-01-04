import { Module }         from '@nestjs/common';
import { AuthController } from 'src/auth.controller';
import { AuthService }    from 'src/auth.service';

@Module({
  imports:     [],
  controllers: [AuthController],
  providers:   [AuthService],
})
export class AppModule {
}
