import { Injectable } from '@nestjs/common';
import { RecipeSite } from "./recipe-site.type";

@Injectable()
export class RecipeSiteService {
  private readonly sites: RecipeSite[] = [
    {
      id: 1,
      url: 'https://vsearch.ajinomoto.co.jp/ja_all/search.x?q=##keyword##&x=5&y=7&ie=utf8&page=1&ct=レシピ&pagemax=10&imgsize=3&pdf=ok&zoom=1&page=1&sort=0&ctor=0&lfor=0',
      name: '味の素',
    },
    {
      id: 2,
      url: 'http://www.orangepage.net/recipes/search?utf8=✓&search_recipe[keyword]=##keyword##',
      name: 'オレンジページ',
    },
    {
      id: 3,
      url: 'https://www.kikkoman.co.jp/homecook/search/select_search.html?free_word=##keyword##',
      name: 'キッコーマン',
    },
    {
      id: 4,
      url: 'https://www.lettuceclub.net/recipe/search/##keyword##/',
      name: 'レタスクラブ',
    },
    {
      id: 5,
      url: 'https://www.kyounoryouri.jp/search/recipe?keyword=##keyword##&timeclass=0&calorie_min=0&calorie_max=0&year=&month=',
      name: 'きょうの料理',
    },
    {
      id: 6,
      url: 'http://hicbc.com/tv/kewpie/search/?kw=##keyword##&max=20&sort=date_desc&page=1',
      name: 'キユーピー3分クッキング（CBC）',
    },
    {
      id: 7,
      url: 'http://3min.ntv.co.jp/3min/search/?keyword=##keyword##&x=0&y=0',
      name: 'キユーピー3分クッキング（日テレ）',
    },
    {
      id: 8,
      url: 'https://www.marukome.co.jp/recipe/result/?freeword=##keyword##',
      name: 'マルコメ',
    },
  ];

  getAll(): RecipeSite[] {
    return this.sites;
  }
}
