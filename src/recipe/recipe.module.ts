import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { DatabaseModule } from '../database.module';
import { recipeProvider } from './recipe.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipeController],
  providers: [
    ...recipeProvider,
    RecipeService,
  ]
})
export class RecipeModule {}
