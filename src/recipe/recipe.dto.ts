import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class RecipeGetDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsNumberString()
  userId?: number;
}

export class RecipeGetAllDto {
  @IsOptional()
  @IsNumberString()
  userId?: number;
}

export class RecipeCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  kana: string;
}

export class RecipeUpdateDto extends RecipeCreateDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @IsString()
  memo: string;
}

export class RecipeDeleteDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
