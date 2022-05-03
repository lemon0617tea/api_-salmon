import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ApiModule],
})
export class AppModule {}
