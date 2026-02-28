import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { strictCors } from './cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(strictCors);

  const port = Number(process.env.PORT ?? 7072);
  await app.listen(port);
}

void bootstrap();
