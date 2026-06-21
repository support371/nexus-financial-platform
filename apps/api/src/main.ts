import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { strictCors } from './cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(strictCors);
  app.enableShutdownHooks();

  const configuredPort = Number(process.env.PORT ?? 7072);
  const port = Number.isInteger(configuredPort) && configuredPort > 0 && configuredPort <= 65535
    ? configuredPort
    : 7072;

  await app.listen(port, '0.0.0.0');
  Logger.log(`Nexus API listening on port ${port} in sandbox mode`, 'Bootstrap');
}

void bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  Logger.error(message, undefined, 'Bootstrap');
  process.exitCode = 1;
});
