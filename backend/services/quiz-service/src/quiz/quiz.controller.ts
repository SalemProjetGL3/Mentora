import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizSubmissionDto } from './dto/submit-answer.dto';
import { JwtAuthGuard, RolesGuard, Roles } from 'auth-utils';


@UseGuards(JwtAuthGuard)
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Endpoint to create a new quiz
  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to create quizzes
  @UseGuards(RolesGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  // Endpoint to get all quizzes
  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to view all quizzes
  @UseGuards(RolesGuard)  
  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  // Endpoint to get a quiz by ID, with an optional query parameter to populate questions
  @Get(':id')
  findOne(@Param('id') id: string, @Query('populate') populate?: string) {
    const populateQuestions = populate === 'true';
    return this.quizService.findOne(id, populateQuestions);
  }

  // Endpoint to update a quiz by ID
  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to update quizzes
  @UseGuards(RolesGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  // Endpoint to delete a quiz by ID
  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to delete quizzes
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  // Endpoint to submit answers for a specific quiz question
  @Post(':id/submit') // Endpoint to submit answers for a whole quiz
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  submitAnswers(@Param('id') quizId: string, @Body() submissionDto: QuizSubmissionDto) {
    return this.quizService.validateAnswers(quizId, submissionDto);
  }

  // Endpoint to get quiz by tags
  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to view quizzes by tags
  @UseGuards(RolesGuard)
  @Get('tags')
  findByTags(@Query('tags') tags: string) {
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    return this.quizService.findByTags(tagsArray);
  }
}