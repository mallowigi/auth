import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth-service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  async login(req) {
    return await this.authService.login(req);
  }

  @Get()
  async getUser(req) {
    return this.authService.getUser(req);
  }
}
