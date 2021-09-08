import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../user/user.entity';
import { Dish } from "../dish/dish.entity";

@Entity({
  name: 'recipes',
})
export class Recipe {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  kana: string;

  @Column({ nullable: true })
  rate: number;

  @Column({ type: 'tinyint', nullable: true })
  kind: number;

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
  user?: User;

  @OneToMany(type => Dish, dish => dish.recipe)
  dishes?: Dish[];
}
