import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { DishModule } from './dish/dish.module';
import { DiaryModule } from './diary/diary.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RecipeSiteModule } from './recipe-site/recipe-site.module';

@Module({
  imports: [
    UserModule,
    RecipeModule,
    DishModule,
    DiaryModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecipeSiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
