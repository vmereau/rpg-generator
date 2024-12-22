import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config/dist";
import { HttpModule } from "@nestjs/axios";
import {MonstersModule} from "./monsters/monsters.module";
import {RouterModule} from "@nestjs/core";
import {appRoutes} from "./app.routes";
import {GlobalModule} from "./global.module";
import {ShopModule} from "./shop/shop.module";

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
    RouterModule.register(appRoutes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
