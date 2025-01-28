import { Body, Controller, Post } from '@nestjs/common';
import { AdventurerService } from './adventurer.service';
import { Adventurer } from './adventurer.class';
import { GenerateStoryDto } from '../story/story.controller';

export class GenerateAdventurerDto {
  additionalGenerationInfos?: string;
}

@Controller()
export class AdventurerController {
  constructor(private readonly adventurerService: AdventurerService) {}

  @Post('generate')
  generateAdventurer(@Body() body: GenerateAdventurerDto): Promise<Adventurer> {
    return this.adventurerService.generateAdventurer(body);
  }
}
