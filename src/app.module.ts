import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost',
      port: 3306, // 数据库端口
      username: 'root', // 数据库用户名
      password: '123456',
      database: 'nationalhelp', // 数据库名称
      synchronize: true, // 是否自动创建数据库表
      retryDelay: 500, // 重试时间
      retryAttempts: 10, // 重试次数
      autoLoadEntities: true, // 自动加载实体
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
