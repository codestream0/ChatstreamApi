import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port = process.env.PORT || 3100;
  await app.listen(Port);
  console.log(`Application is running on: http://localhost:${Port}`);
}
bootstrap();
