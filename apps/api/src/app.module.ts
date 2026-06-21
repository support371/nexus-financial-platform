import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreService } from './core.service';

@Module({
  controllers: [AppController],
  providers: [CoreService],
})
export class AppModule {}
