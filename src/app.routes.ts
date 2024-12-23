import { Routes } from '@nestjs/core';
import {MonstersModule} from "./monsters/monsters.module";
import {ShopModule} from "./shop/shop.module";
import {StoryModule} from "./story/story.module";

export const appRoutes: Routes = [
  {
    path: 'monsters',
    module: MonstersModule,
  },
  {
    path: 'shop',
    module: ShopModule
  },
  {
    path: 'story',
    module: StoryModule
  }
];
