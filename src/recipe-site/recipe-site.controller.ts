import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from "../auth/jwt.guard";
import { JwtRequest } from "../auth/auth.type";
import { RecipeSiteService } from "./recipe-site.service";

@Controller('recipe-site')
export class RecipeSiteController {
  constructor(private readonly recipeSiteService: RecipeSiteService) {
  }

  @UseGuards(JwtGuard)
  @Get()
  get(@Req() req: JwtRequest) {
    return this.recipeSiteService.getAll();
  }
}
