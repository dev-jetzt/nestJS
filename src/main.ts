import { NestFactory } from '@nestjs/core';
import { MatchModule } from './match.module';

async function bootstrap() {
  const app = await NestFactory.create(MatchModule);
  await app.listen(3000);
  // tslint:disable-next-line:no-console
  console.log(`Listening on port 3000`);
}
bootstrap();
