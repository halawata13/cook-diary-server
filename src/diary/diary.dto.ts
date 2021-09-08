import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class DiaryGetDto {
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

export class DiaryCreateDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  memo?: string;
}

export class DiaryUpdateDto extends DiaryCreateDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
