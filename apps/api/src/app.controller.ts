import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('api')
export class AppController {
  constructor(private readonly coreService: CoreService) {}

  @Get('hello')
  hello() {
    return {
      message: 'Nexus API is online.',
      operatingMode: 'sandbox',
    };
  }

  @Get('health')
  health() {
    return {
      ok: true,
      service: 'nexus-financial-platform-api',
      operatingMode: 'sandbox',
      liveMoneyMovementEnabled: false,
    };
  }

  @Get('system/status')
  systemStatus() {
    return this.coreService.getStatus();
  }
}
