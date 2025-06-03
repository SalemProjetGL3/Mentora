import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard, RolesGuard, Roles } from 'auth-utils';

@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to create questions
  @UseGuards(RolesGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to view all questions
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.questionService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to update questions
  @UseGuards(RolesGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Roles('ADMIN') // Only allow users with the 'ADMIN' role to delete questions
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}