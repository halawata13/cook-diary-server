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
import { Recipe } from "../recipe/recipe.entity";
import { User } from "../user/user.entity";

@Entity({
  name: 'dishes',
})
@Index(['date'])
export class Dish {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({
    name: 'recipe_id',
    type: 'bigint',
  })
  recipeId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ length: 255, nullable: true })
  url: string;

  @Column({ type: 'tinyint', nullable: true })
  type: number;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(type => Recipe)
  @JoinColumn([
    { name: 'recipe_id' },
  ])
  recipe: Recipe;
}
