import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = new this.questionModel(createQuestionDto);
    return newQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const existingQuestion = await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return existingQuestion;
  }

  async remove(id: string): Promise<any> {
    const result = await this.questionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return { message: `Question with ID "${id}" successfully deleted` };
  }

  // Helper to get correct answers for a question (useful for validation)
  async getCorrectAnswers(questionId: string): Promise<string[]> {
    const question = await this.findOne(questionId);
    return question.answers
      .filter((answer: { isCorrect: boolean; _id: any }) => answer.isCorrect)
      .map((answer: { _id: any }) => answer._id.toString()); // Assuming answers have _id
  }
}