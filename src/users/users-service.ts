import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user';

@Injectable()
export class UsersService {
  getUser(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      return resolve(new User(username, password));
    });
  }
}
