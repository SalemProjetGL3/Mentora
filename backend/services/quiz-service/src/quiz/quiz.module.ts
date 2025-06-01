import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { QuestionModule } from '../question/question.module'; // Import QuestionModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    QuestionModule, // Import QuestionModule to use QuestionService
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}