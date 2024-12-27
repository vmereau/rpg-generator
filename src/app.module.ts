import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config/dist";
import { HttpModule } from "@nestjs/axios";
import {MonstersModule} from "./monster/monsters.module";
import {RouterModule} from "@nestjs/core";
import {appRoutes} from "./app.routes";
import {GlobalModule} from "./global.module";
import {ShopModule} from "./shop/shop.module";
import {StoryModule} from "./story/story.module";
import {AdventurerModule} from "./adventurer/adventurer.module";
import {SkillModule} from "./skill/skill.module";
import {ChoiceModule} from "./choice/choice.module";

@Module({
  imports: [
    GlobalModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MonstersModule,
    ShopModule,
    StoryModule,
    AdventurerModule,
    SkillModule,
    ChoiceModule,
    RouterModule.register(appRoutes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
