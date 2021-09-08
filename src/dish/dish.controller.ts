import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { DishService } from "./dish.service";
import { JwtGuard } from '../auth/jwt.guard';
import { JwtRequest } from '../auth/auth.type';
import { DishCreateDto, DishDeleteDto, DishGetByDateDto, DishGetByRecipeDto } from './dish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {
  }

  @UseGuards(JwtGuard)
  @Get('recipe')
  async getByRecipe(@Req() req: JwtRequest, @Query() query: DishGetByRecipeDto) {
    const userId = query.userId ?? req.user.id;
    return this.dishService.findByRecipe(userId, query.recipeId);
  }

  @UseGuards(JwtGuard)
  @Get('date')
  async getByDate(@Req() req: JwtRequest, @Query() query: DishGetByDateDto) {
    const userId = query.userId ?? req.user.id;
    const dateObj = new Date(query.year, query.month - 1, query.date);
    return this.dishService.findByDate(userId, dateObj);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: JwtRequest, @Body() body: DishCreateDto) {
    return this.dishService.create(req.user.id, body);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async delete(@Req() req: JwtRequest, @Query() query: DishDeleteDto) {
    const result = await this.dishService.delete(req.user.id, query.id);
    if (!result) {
      throw new BadRequestException();
    }

    return query;
  }
}
