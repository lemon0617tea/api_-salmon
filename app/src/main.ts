import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { mkdir, writeFileSync } from 'fs';
import { dump } from 'js-yaml';
import { exec } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const build = path.resolve(process.cwd(), '../docs');
  const options = new DocumentBuilder()
    .setTitle('Salmon Stats API Documents')
    .build();
  const documents = SwaggerModule.createDocument(app, options);
  const output = path.resolve(build, 'index');
  mkdir(build, { recursive: true }, (_) => {});
  writeFileSync(`${output}.json`, JSON.stringify(documents), {
    encoding: 'utf8',
  });
  writeFileSync(`${output}.yaml`, dump(documents, {}));
  exec(`npx redoc-cli build ${output}.json -o ${output}.html`);
  if (process.env.NODE_ENV == 'production') {
    return;
  }
  SwaggerModule.setup('documents', app, documents);
  await app.listen(3000);
}
bootstrap();
