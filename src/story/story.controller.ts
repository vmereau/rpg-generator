import { Body, Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from './story.class';

export class GenerateStoryDto {
  premise?: string;
}

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('generate')
  generateStory(@Body() body: GenerateStoryDto): Promise<Story> {
    return this.storyService.generateStory(body);
  }
}
