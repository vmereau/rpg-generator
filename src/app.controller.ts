import {Body, Controller, Post} from '@nestjs/common';
import {AppService, MonsterBiome, MonsterGenerationData} from './app.service';

export class GenerateDto {
  number: number;
  level: number;
  biome: MonsterBiome;
  withPictures?: boolean = false;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("generate")
  generateMonsters(@Body() body: GenerateDto) {

    const data: MonsterGenerationData = {
      biome: body.biome || MonsterBiome.Forest,
      numberOfMonsters:body.number || 1,
      level: body.level || 1,
      withPictures: body.withPictures || false
    }

    return this.appService.generateMonsters(data);
  }
}
