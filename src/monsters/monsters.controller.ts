import {Body, Controller, Get, Post} from '@nestjs/common';
import {Monster, MonsterGenerationData, MonstersService} from "./monsters.service";

export class GenerateMonstersDto {
  number: number;
  level: number;
  biome: string;
  withPictures?: boolean = false;
}

@Controller()
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post("generate")
  generateMonsters(@Body() body: GenerateMonstersDto) {

    const data: MonsterGenerationData = {
      biome: body.biome || "forest",
      numberOfMonsters:body.number || 1,
      level: body.level || 1,
      withPictures: body.withPictures || false
    }

    return this.monstersService.generateMonsters(data);
  }

  @Get()
  getGeneratedMonsters(): Monster[] {
    return this.monstersService.getGeneratedMonsters();
  }
}
