import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtGuard } from '../auth/jwt.guard';
import { JwtRequest } from '../auth/auth.type';
import { RecipeCreateDto, RecipeDeleteDto, RecipeGetAllDto, RecipeGetDto, RecipeUpdateDto } from './recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtGuard)
  @Get()
  async get(@Req() req: JwtRequest, @Query() query: RecipeGetDto) {
    const userId = query.userId ?? req.user.id;
    return (await this.recipeService.find(userId, query.id)) ?? {};
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Req() req: JwtRequest, @Query() query: RecipeGetAllDto) {
    const userId = query.userId ?? req.user.id;
    return await this.recipeService.findAll(userId);
  }

  @UseGuards(JwtGuard)
  @Post('find-or-create')
  async findOrCreate(@Req() req: JwtRequest, @Body() body: RecipeCreateDto) {
    const result = await this.recipeService.findByName(req.user.id, body.name);
    if (result) {
      return result;
    }

    return await this.recipeService.create(req.user.id, body);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: JwtRequest, @Body() body: RecipeCreateDto) {
    return await this.recipeService.create(req.user.id, body);
  }

  @UseGuards(JwtGuard)
  @Put()
  async update(@Req() req: JwtRequest, @Body() body: RecipeUpdateDto) {
    const result = await this.recipeService.update(req.user.id, body);
    if (!result) {
      throw new BadRequestException();
    }

    return result;
  }

  @UseGuards(JwtGuard)
  @Delete()
  async delete(@Req() req: JwtRequest, @Query() query: RecipeDeleteDto) {
    return await this.recipeService.delete(req.user.id, query.id);
  }
}
