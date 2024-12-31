import { Body, Controller, Post } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './skill.class';

export class GenerateSkillDto {
  archetype = 'warrior'; // archetype of the character to create skill for
  level: number;
}

@Controller()
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post('generate')
  generateSkill(@Body() body: GenerateSkillDto): Promise<Skill> {
    return this.skillService.generateSkill(body);
  }
}
