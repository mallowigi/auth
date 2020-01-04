import { Controller }  from '@nestjs/common';
import { GrpcMethod }  from '@nestjs/microservices';
import { AuthService } from 'src/auth.service';

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
