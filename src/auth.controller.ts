import { AuthService } from '@mallowigi/auth/src/auth.service';
import { Controller }  from '@nestjs/common';
import { GrpcMethod }  from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @GrpcMethod('AuthService')
  async login(req) {
    return await this.authService.login(req);
  }

  @GrpcMethod('AuthService')
  async getUser(req) {
    return this.authService.getUser(req);
  }
}
