import {Controller, Get, Post} from '@nestjs/common';
import {StoryService} from "./story.service";
import {Story} from "./story.class";

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post("generate")
  generateShop(): Promise<Story> {

    return this.storyService.generateStory();
  }

  @Get()
  getGeneratedShops(): Story {
    return this.storyService.getGeneratedStory();
  }
}
