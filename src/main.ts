import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // tslint:disable-next-line:no-console
  console.log(`Listening on port 3000`);
}
bootstrap();
