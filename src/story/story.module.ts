import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import {StoryController} from "./story.controller";
import {StoryService} from "./story.service";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
