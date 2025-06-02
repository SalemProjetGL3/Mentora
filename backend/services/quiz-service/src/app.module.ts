import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { join } from 'path';

@Module({
  imports: [
    // Optional: For loading .env variables
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: join(__dirname, '../../../.env'),
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI'),
        }),
        inject: [ConfigService],
      }),
    // Feature Modules
    QuestionModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}