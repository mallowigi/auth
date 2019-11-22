import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from 'src/auth/auth-service';
import { UsersService } from 'src/users/users-service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {
}
