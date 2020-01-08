import { Injectable }                                                                            from '@nestjs/common';
import { Client, ClientGrpc }                                                                    from '@nestjs/microservices';
import { first }                                                                                 from 'rxjs/operators';
import { AuthModel }                                                                             from 'src/models/authModel';
import {
  IAuthService,
  usersGrpcClientOptions,
  IUsersService,
  LoginResponse,
  LoginRequest,
  GetUserRequest, GetUserResponse, LoginUser, logger,
} from '@mallowigi/common';

@Injectable()
export class AuthService implements IAuthService {
  @Client(usersGrpcClientOptions)
  private client: ClientGrpc;

  private grpcUsersService: IUsersService;

  private static generateToken() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 35; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  onModuleInit() {
    this.grpcUsersService = this.client.getService<IUsersService>('UsersService');
  }

  async login(req: LoginRequest): Promise<LoginResponse> {
    const { username, password } = req;
    const message = 'missing username or password';
    if (!username || !password) {
      throw Error(message);
    }

    try {
      const user = await this.getLoggedInUser(username, password);
      if (!user) {
        throw Error(message);
      }

      // Retrieve the token if the user was found
      const query = { userId: user.id };
      let auth = await AuthModel.findToken(query);
      if (!auth) {
        const token = AuthService.generateToken();
        const data = { token, userId: user.id };
        // Create a token
        auth = await AuthModel.create(data);
      }
      return { token: auth.token };
    }
    catch (error) {
      logger.error({ message, error, username });
      throw Error(message);
    }

  }

  async getUser(req: GetUserRequest): Promise<GetUserResponse> {
    const { token } = req;
    const message = 'invalid token';

    try {
      const auth = await AuthModel.findOne({ token });
      if (!auth) {
        throw Error(message);
      }

      const user = await this.getUserById(auth.userId);
      logger.info('authenticated user by token');
      return { user };
    }
    catch (error) {
      logger.error({ message, error });
      throw Error(message);
    }
  }

  private async getLoggedInUser(username: string, password: string): Promise<any> {
    const usersList = await this.grpcUsersService.list({ query: { username, password } });
    return usersList.pipe(first());
  }

  private async getUserById(userId: string): Promise<LoginUser> {
    const user = await this.grpcUsersService.get({ id: userId });
    return {
      id:       user.id,
      username: user.username,
    };
  }
}
