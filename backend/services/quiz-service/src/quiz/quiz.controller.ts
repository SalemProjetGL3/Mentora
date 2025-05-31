import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizSubmissionDto } from './dto/submit-answer.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('populate') populate?: string) {
    const populateQuestions = populate === 'true';
    return this.quizService.findOne(id, populateQuestions);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  @Post(':id/submit') // Endpoint to submit answers for a whole quiz
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  submitAnswers(@Param('id') quizId: string, @Body() submissionDto: QuizSubmissionDto) {
    return this.quizService.validateAnswers(quizId, submissionDto);
  }

  // Endpoint to get quiz by tags
  @Get('tags')
  findByTags(@Query('tags') tags: string) {
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    return this.quizService.findByTags(tagsArray);
  }
}