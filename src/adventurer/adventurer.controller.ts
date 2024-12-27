import {Controller, Get, Post} from '@nestjs/common';
import {AdventurerService} from "./adventurer.service";
import {Adventurer} from "./adventurer.class";

@Controller()
export class AdventurerController {
  constructor(private readonly adventurerService: AdventurerService) {}

  @Post("generate")
  generateAdventurer(): Promise<Adventurer> {

    return this.adventurerService.generateAdventurer();
  }
}
