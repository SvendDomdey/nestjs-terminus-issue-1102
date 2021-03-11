import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('Health Service Tests', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: TypeOrmHealthIndicator,
          useFactory: () => ({
            pingCheck: jest.fn(
              (): Promise<HealthIndicatorResult> =>
                Promise.resolve({
                  database: {
                    status: 'up',
                  },
                }),
            ),
          }),
        },
        {
          provide: HealthCheckService,
          useFactory: () => ({
            check: jest.fn(
              (args): Promise<HealthCheckResult> => {
                return args[0].apply(this);
              },
            ),
          }),
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('The readiness check call shall delegate to the typeorm health indicator', async () => {
    expect(service).toBeDefined();
    expect(await service.checkReadiness()).toStrictEqual({
      database: {
        status: 'up',
      },
    });
  });
});
