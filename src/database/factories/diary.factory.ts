import { define } from 'typeorm-seeding';
import { Diary } from '../../diary/diary.entity';

const date = new Date();

define(Diary, faker => {
  const diary = new Diary();
  date.setTime(date.getTime() - 1000 * 60 * 60 * 24);

  diary.date = date;
  diary.memo = faker.lorem.text();

  return diary;
});
