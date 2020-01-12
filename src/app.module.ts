import { AuthController }   from '@mallowigi/auth/src/auth.controller';
import { AuthService }      from '@mallowigi/auth/src/auth.service';
import { clientsProviders } from '@mallowigi/common';
import { Module }           from '@nestjs/common';

@Module({
  imports:     [],
  controllers: [AuthController],
  providers:   [...clientsProviders, AuthService],
})
export class AppModule {
}
