import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [QuestionModule, QuizModule],
})
export class AppModule {}
