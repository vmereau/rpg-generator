import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { HttpService } from '@nestjs/axios';
import { adventurerSchema } from './adventurer.schema';
import { validateCharacterProperties } from '../core/character/character.utils';
import { CharacterNotValidException } from '../core/character/character.errors';
import { Adventurer } from './adventurer.class';
import { GenerateAdventurerDto } from './adventurer.controller';
import {IaGenerationService} from "../shared/ia-generation.service";
import {Story} from "../story/story.class";

@Injectable()
export class AdventurerService {
  private generatedAdventurer: Adventurer;
  private previousArchetypes: string[] = [];
  private previousArchetypesMaxSize = 5;

  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateAdventurer(data: GenerateAdventurerDto) {
    let prompt =
      'generate a level 1 adventurer ' +
      'with a short original description that should include some kind of archetype and a backstory ' +
      // "his health, attack and mana properties should reflect his archetype " +
      'his level 1 properties should be : ' +
      'a base of 15 plus a random integer between 1 and 15 for his health, ' +
      'a base of 3 plus a random integer between 1 and 7 for his attack, ' +
      'a base of 5 plus a random integer between 5 and 10 for his mana, ' +
      'a base of 5 plus a random integer between 1 and 5 for his defense, ' +
      'with no skill, ' +
      // "add a skill with a name that fits the adventurer's description, " +
      'each field should be filled ' +
      `the archetype should be different than the following ones: ${this.previousArchetypes.join(
        ', '
      )}`;

    if (data.additionalGenerationInfos) {
      prompt += `the user wants the adventurer to be about ${data.additionalGenerationInfos}`;
    }

    console.log('Generating Adventurer...');

    const result = await this.iaGenerationService.generateText(prompt, adventurerSchema);
    const generatedAdventurer: Adventurer = JSON.parse(result.response.text());

    console.log('adventurers generated and parsed, checking integrity ...');

    const errors = validateCharacterProperties(generatedAdventurer);

    if (errors.length !== 0) {
      console.log(
        'Something went wrong in the adventurer generation, logging errors...'
      );
      throw new CharacterNotValidException(errors);
    }

    console.log('generated adventurer seems valid');

    this.generatedAdventurer = generatedAdventurer;
    this.addToPreviousArchetypes(this.generatedAdventurer.archetype);

    return generatedAdventurer;
  }

  public async generateAdventurerImg(adventurer?: Adventurer) {
    const prompt = `Generate an image for the following adventurer: '${adventurer.name}',
      with the following archetype: '${adventurer.archetype}',
      and the following description: ${adventurer.description}`;

    console.log(prompt);

    return await this.iaGenerationService.generateImg(prompt);
  }

  private addToPreviousArchetypes(archetype: string): void {
    this.previousArchetypes.push(archetype);

    if (this.previousArchetypes.length > this.previousArchetypesMaxSize) {
      this.previousArchetypes.shift();
    }
  }
}
