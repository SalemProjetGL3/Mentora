import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question, QuestionSchema } from './schemas/question.schema';
import { AuthUtilsModule } from 'auth-utils';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    AuthUtilsModule, // Import AuthUtilsModule for JWT and roles guards
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService, MongooseModule],
})
export class QuestionModule {}