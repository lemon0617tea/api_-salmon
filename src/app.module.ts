import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
