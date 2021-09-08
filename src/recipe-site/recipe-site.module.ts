import { Module } from '@nestjs/common';
import { RecipeSiteService } from './recipe-site.service';
import { RecipeSiteController } from './recipe-site.controller';

@Module({
  providers: [RecipeSiteService],
  controllers: [RecipeSiteController]
})
export class RecipeSiteModule {}
