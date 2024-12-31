import { Body, Controller, Post } from '@nestjs/common';
import { MonstersService } from './monsters.service';

export class GenerateMonstersDto {
  number = 1;
  level = 1;
  biome = 'forest';
  withPictures?: boolean = false;
}

@Controller()
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post('generate')
  generateMonsters(@Body() body: GenerateMonstersDto) {
    return this.monstersService.generateMonsters(body);
  }
}
