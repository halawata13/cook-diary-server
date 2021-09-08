import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Recipe } from "../recipe/recipe.entity";
import { Diary } from "../diary/diary.entity";

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @OneToMany(type => Recipe, recipe => recipe.user)
  recipes: Recipe[];

  @OneToMany(type => Diary, diary => diary.user)
  diaries: Diary[];
}
