import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import {AdventurerController} from "./adventurer.controller";
import {AdventurerService} from "./adventurer.service";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [AdventurerController],
  providers: [AdventurerService],
})
export class AdventurerModule {}
