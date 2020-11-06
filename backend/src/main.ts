import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4200'],
      
    },
    
  });
  const net = os.networkInterfaces();
  console.log(net);
  await app.listen(3000);
}
bootstrap();
