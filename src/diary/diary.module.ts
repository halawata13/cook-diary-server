import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DatabaseModule } from "../database.module";
import { diaryProvider } from "./diary.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [DiaryController],
  providers: [
    ...diaryProvider,
    DiaryService,
  ]
})
export class DiaryModule {}
