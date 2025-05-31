import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuestionService } from '../question/question.service';
import { Question, QuestionDocument, QuestionType } from '../question/schemas/question.schema';
import { Answer } from '../question/schemas/answer.schema'; 
import { QuizSubmissionDto } from './dto/submit-answer.dto'; 
@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    private readonly questionService: QuestionService,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<QuizDocument> { 
    // Validate if all questionIds exist
    for (const qId of createQuizDto.questionIds) {
      await this.questionService.findOne(qId); 
    }
    const newQuiz = new this.quizModel(createQuizDto);
    return newQuiz.save();
  }

  async findAll(): Promise<QuizDocument[]> { 
    return this.quizModel.find().exec();
  }

  async findOne(id: string, populateQuestions: boolean = false): Promise<QuizDocument> { 
    const query = this.quizModel.findById(id);
    if (populateQuestions) {
      query.populate<{ questionIds: QuestionDocument[] }>('questionIds');
    }
    const quiz = await query.exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }

    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<QuizDocument> { 
    if (updateQuizDto.questionIds) {
      for (const qId of updateQuizDto.questionIds) {
        await this.questionService.findOne(qId);
      }
    }
    const existingQuiz = await this.quizModel.findByIdAndUpdate(id, updateQuizDto, { new: true }).exec();
    if (!existingQuiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }
    return existingQuiz;
  }

  async remove(id: string): Promise<{ message: string }> { 
    const result = await this.quizModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Quiz with ID "${id}" not found`);
    }
    return { message: `Quiz with ID "${id}" successfully deleted` };
  }

  async validateAnswers(quizId: string, submission: QuizSubmissionDto): Promise<any> { 
    const quiz = await this.findOne(quizId, true); 

    if (!quiz.questionIds || !Array.isArray(quiz.questionIds) || quiz.questionIds.length === 0) {
      throw new BadRequestException('Quiz has no questions to validate or questionIds is not an array.');
    }

    
    if (quiz.questionIds.length > 0 && !(typeof quiz.questionIds[0] === 'object' && quiz.questionIds[0] !== null)) {
        throw new BadRequestException('Questions in the quiz are not properly populated. Expected objects, got IDs.');
    }


    const populatedQuestions = quiz.questionIds as unknown as QuestionDocument[];

    let score = 0;
    const totalQuestionsInQuiz = populatedQuestions.length;
    const results: Array<{
      questionId: string;
      isCorrect: boolean;
      message?: string;
      selectedAnswerIds?: string[];
      correctAnswerIds?: string[];
    }> = [];

    for (const submittedAnswer of submission.answers) {
      const questionInQuiz = populatedQuestions.find(
        (q) => q && q._id && q._id.toString() === submittedAnswer.questionId,
      );

      if (!questionInQuiz) {
        results.push({
          questionId: submittedAnswer.questionId,
          isCorrect: false,
          message: "Question not found in this quiz."
        });
        continue;
      }

      const correctAnswersForQuestion = questionInQuiz.answers
        .filter((ans: Answer & { _id: Types.ObjectId }) => ans.isCorrect)
        .map((ans: Answer & { _id: Types.ObjectId }) => ans._id.toString());

      let isSubmissionCorrect = false;
      if (questionInQuiz.type === QuestionType.SINGLE_CHOICE || questionInQuiz.type === QuestionType.TRUE_FALSE) {
        if (submittedAnswer.selectedAnswerIds.length !== 1) {
          results.push({
            questionId: submittedAnswer.questionId,
            isCorrect: false,
            message: "Single choice questions require exactly one answer."
          });
          continue;
        }
        isSubmissionCorrect = correctAnswersForQuestion.includes(submittedAnswer.selectedAnswerIds[0]);
      } else if (questionInQuiz.type === QuestionType.MULTIPLE_CHOICE) {
        const selectedSet = new Set(submittedAnswer.selectedAnswerIds);
        const correctSet = new Set(correctAnswersForQuestion);
        isSubmissionCorrect = selectedSet.size === correctSet.size &&
          [...selectedSet].every(id => correctSet.has(id));
      }

      if (isSubmissionCorrect) {
        score++;
      }
      results.push({
        questionId: submittedAnswer.questionId,
        selectedAnswerIds: submittedAnswer.selectedAnswerIds,
        correctAnswerIds: correctAnswersForQuestion,
        isCorrect: isSubmissionCorrect,
      });
    }

    return {
      quizId,
      score,
      totalQuestions: totalQuestionsInQuiz,
      detailedResults: results,
    };
  }
}