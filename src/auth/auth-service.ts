import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users-service';
import { User } from 'src/users/user';
import { LoginRequest } from 'src/auth/login-request';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async login(req: LoginRequest) {
    const { username, password } = req;
    if (!username || !password) {
      throw Error('Missing username or password');
    }

    const user = await this.getLoggedInUser(username, password);
    if (!user) {
      throw Error('wrong username or password');
    }

    const query = { id: user.id };
    // let auth = await this.findOne(query);
  }

  getUser(req: LoginRequest) {
    return this.getLoggedInUser(req.username, req.password);
  }

  private async findOne(query: { id: number }) {

  }

  private async getLoggedInUser(username: string, password: string): Promise<User> {
    return this.usersService.getUser(username, password);
  }
}
