import { Inject, Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Diary } from "./diary.entity";
import { DiaryCreateDto, DiaryUpdateDto } from './diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    @Inject('DIARY_REPOSITORY')
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  async find(userId: number, date: Date): Promise<Diary | undefined> {
    return this.diaryRepository.findOne({
      userId,
      date,
    });
  }

  async create(userId: number, params: DiaryCreateDto): Promise<Diary | null> {
    const diary = await this.diaryRepository.create({
      ...params,
      userId,
    });
    return this.diaryRepository.save(diary);
  }

  async update(userId: number, params: DiaryUpdateDto): Promise<Diary | null> {
    const diary = await this.diaryRepository.findOne({
      id: params.id,
      userId: userId,
    });
    if (!diary) {
      return null;
    }

    const updateParams = {
      ...diary,
      ...params,
    };

    return this.diaryRepository.save(updateParams);
  }
}
