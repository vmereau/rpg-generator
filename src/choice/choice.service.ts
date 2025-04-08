import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { HttpService } from '@nestjs/axios';
import { Choice } from './choice.class';
import { choiceSchema } from './choice.schema';
import { GenerateChoicesDto } from './choice.controller';
import { validateChoicesProperties } from './choice.utils';
import { NoValidChoice } from './choice.error';
import {IaGenerationService} from "../shared/ia-generation.service";

@Injectable()
export class ChoiceService {
  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateChoices(data: GenerateChoicesDto): Promise<Choice[]> {
    const prompt =
      'an adventurer is progressing in the following story: ' +
      `${data.story.name}, ${data.story.story_summary}, happening in ${data.story.biome} ` +
      `he comes to a point where he is faced with ${data.numberOfChoices} different choices to progress his story, generate them.` +
      `he should not be facing the boss (${data.story.boss_name})`;

    console.log('Generating Choices...');

    const result = await this.iaGenerationService.generateText(prompt, choiceSchema);
    const generatedChoices: Choice[] = JSON.parse(result.response.text());

    console.log('choices generated and parsed, checking integrity ...');

    const errors = validateChoicesProperties(generatedChoices);
    if (errors.length !== 0) {
      console.log(
        'Something went wrong in choices generation, skipping and logging errors...'
      );
      throw new NoValidChoice(errors);
    }

    console.log('generated choices seems valid');

    return generatedChoices;
  }
}
