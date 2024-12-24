import {Body, Controller, Get, Post} from '@nestjs/common';
import {Monster, MonstersService} from "./monsters.service";

export class GenerateMonstersDto {
  number: number = 1;
  level: number = 1;
  biome: string = "forest";
  withPictures?: boolean = false;
}

@Controller()
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post("generate")
  generateMonsters(@Body() body: GenerateMonstersDto) {

    return this.monstersService.generateMonsters(body);
  }

  @Get()
  getGeneratedMonsters(): Monster[] {
    return this.monstersService.getGeneratedMonsters();
  }
}
