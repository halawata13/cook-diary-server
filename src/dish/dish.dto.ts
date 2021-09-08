import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class DishGetByRecipeDto {
  @IsOptional()
  @IsNumberString()
  userId?: number;

  @IsNotEmpty()
  @IsNumberString()
  recipeId: number;
}

export class DishGetByDateDto {
  @IsOptional()
  @IsNumberString()
  userId?: number;

  @IsNotEmpty()
  @IsNumberString()
  year: number;

  @IsNotEmpty()
  @IsNumberString()
  month: number;

  @IsNotEmpty()
  @IsNumberString()
  date: number;
}

export class DishCreateDto {
  @IsNotEmpty()
  @IsNumberString()
  recipeId: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}

export class DishDeleteDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
