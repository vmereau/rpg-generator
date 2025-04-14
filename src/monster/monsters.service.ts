import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { HttpService } from '@nestjs/axios';
import { NoValidMonstersException } from './monsters.errors';
import { monstersSchema } from './Monsters.schema';
import { GenerateMonstersDto } from './monsters.controller';
import { validateCharacterProperties } from '../core/character/character.utils';
import { Monster } from './monster.class';
import { IaGenerationService } from '../shared/ia-generation.service';

export enum MonsterLevelDescription {
  level_1 = 'a weak monster',
  level_2 = 'an average looking monster',
  level_3 = 'a strong looking monster',
  level_4 = 'a giant epic monster',
}

@Injectable()
export class MonstersService {
  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateMonsters(data: GenerateMonstersDto) {
    const prompt =
      `create a list of ${data.number} ${data.level} monsters with ` +
      'health being a base of 10 plus a random number between 1 and 10 multiplied by their level,' +
      'attack being 1 plus a random number between 1 and 4 multiplied by their level,' +
      'mana being 1 plus a random number between 1 and 4 multiplied by their level,' +
      'defense being 1 plus a random number between 1 and 4 multiplied by their level,' +
      'experienceGiven being a random number between 5 and 10 multiplied by their level,' +
      'goldGiven being a random number between 10 and 20 multiplied by their level,' +
      `based on a ${data.biome} environment, ` +
      `its name and short description should feel like  ${
        MonsterLevelDescription['level_' + data.level]
      }, ` +
      'with 0 skill, ' +
      'each field should be filled';

    console.log('Generating monsters...');

    const result = await this.iaGenerationService.generateTextV2(
      prompt,
      monstersSchema
    );
    const monsterJSONArray: Monster[] = JSON.parse(result.text);
    console.log('monsters generated and parsed, checking integrity ...');

    const monsters = [];
    monsterJSONArray.forEach(monster => {
      const errors = validateCharacterProperties(monster);
      if (errors.length === 0) {
        console.log('added: ' + monster.name);
        monsters.push(monster);
      } else {
        console.log(
          'Something went wrong in this monster generation, skipping and logging errors...'
        );
        console.log(errors);
      }
    });

    if (monsters.length === 0) {
      console.log('no valid monsters created');
      throw new NoValidMonstersException();
    }

    console.log('generated monsters seems valid');

    return monsters;
  }
}
