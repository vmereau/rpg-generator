import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { HttpService } from '@nestjs/axios';
import { skillSchema } from './skill.schema';
import { GenerateSkillDto } from './skill.controller';
import { Skill } from './skill.class';
import { validateSkillProperties } from './skill.utils';
import { NoValidSkillException } from './skill.errors';
import {IaGenerationService} from "../shared/ia-generation.service";

@Injectable()
export class SkillService {
  private generatedSkill: Skill;

  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateSkill(data: GenerateSkillDto) {
    const prompt =
      `generate an original skill for the following archetype: ${data.archetype} ` +
      `the cost should be 5 multiplied by ${data.level} ` +
      `it can have one or multiple effects, the effect value should be 5 plus a random number between 1 and 5 multiplied by ${data.level} ` +
      'all fields should be filled ' +
      'the generated skill should be different than the previous one';

    console.log('Generating Skill ...');
    const result = await this.iaGenerationService.generateText(prompt, skillSchema);
    const generatedSkill: Skill = JSON.parse(result.response.text());

    console.log('Skill generated and parsed, checking integrity ...');

    const errors = validateSkillProperties(generatedSkill);
    if (errors.length !== 0) {
      console.log(
        'Something went wrong in this skill generation, skipping and logging errors...'
      );
      throw new NoValidSkillException(errors);
    }

    console.log('generated Skill seems valid');

    this.generatedSkill = generatedSkill;
    return generatedSkill;
  }
}
