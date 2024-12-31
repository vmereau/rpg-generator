import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { GenerativeModel } from '@google/generative-ai';
import { HttpService } from '@nestjs/axios';
import { skillSchema } from './skill.schema';
import { GenerateSkillDto } from './skill.controller';
import { Skill } from './skill.class';
import { validateSkillProperties } from './skill.utils';
import { NoValidSkillException } from './skill.errors';

@Injectable()
export class SkillService {
  private generatedSkill: Skill;

  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    @Inject('GENAI_MODEL') private model: GenerativeModel,
  ) {}

  public async generateSkill(data: GenerateSkillDto) {
    const prompt =
      `generate an original skill for the following archetype: ${data.archetype} ` +
      `the cost should be 5 multiplied by ${data.level} ` +
      `it can have one or multiple effects, the effect value should be 5 plus a random number between 1 and 5 multiplied by ${data.level} ` +
      'all fields should be filled ' +
      'the generated skill should be different than the previous one';

    console.log('Generating Skill ...');

    this.model.generationConfig.responseMimeType = 'application/json';
    this.model.generationConfig.responseSchema = skillSchema;
    const result = await this.model.generateContent(prompt);
    const generatedSkill: Skill = JSON.parse(result.response.text());

    console.log('Skill generated and parsed, checking integrity ...');

    const errors = validateSkillProperties(generatedSkill);
    if (errors.length !== 0) {
      console.log(
        'Something went wrong in this skill generation, skipping and logging errors...',
      );
      throw new NoValidSkillException(errors);
    }

    console.log('generated Skill seems valid');

    this.generatedSkill = generatedSkill;
    return generatedSkill;
  }
}
