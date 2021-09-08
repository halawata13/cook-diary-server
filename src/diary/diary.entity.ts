import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../user/user.entity";

@Entity({
  name: 'diaries',
})
@Index(['date'])
export class Diary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text', default: '' })
  memo: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
