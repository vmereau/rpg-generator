import { Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from './story.class';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('generate')
  generateStory(): Promise<Story> {
    return this.storyService.generateStory();
  }
}
