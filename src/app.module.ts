import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config/dist";
import { HttpModule } from "@nestjs/axios";
import {MonstersModule} from "./monsters/monsters.module";
import {RouterModule} from "@nestjs/core";
import {appRoutes} from "./app.routes";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MonstersModule,
    RouterModule.register(appRoutes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
