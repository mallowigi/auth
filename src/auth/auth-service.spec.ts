import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth-service';

describe('AuthService', () => {
  let provider: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    provider = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
