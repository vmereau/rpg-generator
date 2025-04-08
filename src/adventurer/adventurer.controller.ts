import { Body, Controller, Post } from '@nestjs/common';
import { AdventurerService } from './adventurer.service';
import { Adventurer } from './adventurer.class';
import {Story} from "../story/story.class";

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

  @Post('generate-img')
  generateAdventurerImg(@Body() body: Adventurer) {
    return this.adventurerService.generateAdventurerImg(body);
  }
}
