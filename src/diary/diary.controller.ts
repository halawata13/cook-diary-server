import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { DiaryService } from "./diary.service";
import { JwtGuard } from '../auth/jwt.guard';
import { JwtRequest } from '../auth/auth.type';
import { DiaryCreateDto, DiaryGetDto, DiaryUpdateDto } from './diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {
  }

  @UseGuards(JwtGuard)
  @Get()
  async get(@Req() req: JwtRequest, @Query() query: DiaryGetDto) {
    const userId = query.userId ?? req.user.id;
    const dateObj = new Date(query.year, query.month - 1, query.date);
    return (await this.diaryService.find(userId, dateObj)) ?? { userId };
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: JwtRequest, @Body() body: DiaryCreateDto) {
    return this.diaryService.create(req.user.id, body);
  }

  @UseGuards(JwtGuard)
  @Put()
  async update(@Req() req: JwtRequest, @Body() body: DiaryUpdateDto) {
    const result = await this.diaryService.update(req.user.id, body);
    if (!result) {
      throw new BadRequestException();
    }

    return result;
  }
}
