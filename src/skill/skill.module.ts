import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [HttpModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
