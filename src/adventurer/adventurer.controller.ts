import {Body, Controller, Get, Post} from '@nestjs/common';
import {Adventurer, AdventurerService} from "./adventurer.service";

@Controller()
export class AdventurerController {
  constructor(private readonly adventurerService: AdventurerService) {}

  @Post("generate")
  generateAdventurer(): Promise<Adventurer> {

    return this.adventurerService.generateAdventurer();
  }

  @Get()
  getGeneratedAdventurer(): Adventurer {
    return this.adventurerService.getGeneratedAdventurer();
  }
}
