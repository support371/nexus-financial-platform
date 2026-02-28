import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('hello')
  hello() {
    return { message: 'Hello from NestJS (dev starter).' };
  }

  @Get('health')
  health() {
    return { ok: true };
  }
}
