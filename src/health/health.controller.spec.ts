import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('Health Controller Tests', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useFactory: () => ({
            checkReadiness: jest.fn((): boolean => true),
            checkLiveness: jest.fn((): boolean => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('The controller shall delegate the readiness call to the service implementation', async () => {
    expect(controller).toBeDefined();
    expect(await controller.checkReadiness()).toBe(true);
  });
});
