import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WavesService } from './waves.service';

@Controller('api/waves')
export class WavesController {
  constructor(private readonly service: WavesService) {}

  @Post('/')
  create() {}

  @Get('{:start_time}')
  find() {}
}
