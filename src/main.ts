import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置跨域
  app.enableCors({
    origin: '*', // 允许任何域名访问
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
    allowedHeaders: 'Content-Type, Authorization', // 允许的头部
  });
  await app.listen(3000);
}
bootstrap();
