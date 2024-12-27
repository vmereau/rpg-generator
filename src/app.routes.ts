import { Routes } from '@nestjs/core';
import {MonstersModule} from "./monster/monsters.module";
import {ShopModule} from "./shop/shop.module";
import {StoryModule} from "./story/story.module";
import {AdventurerModule} from "./adventurer/adventurer.module";
import {SkillModule} from "./skill/skill.module";
import {ChoiceModule} from "./choice/choice.module";

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
  },
  {
    path: 'adventurer',
    module: AdventurerModule
  },
  {
    path: 'skill',
    module: SkillModule
  },
  {
    path: 'choice',
    module: ChoiceModule
  }
];
