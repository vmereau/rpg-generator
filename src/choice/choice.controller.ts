import { Body, Controller, Post } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { Choice } from './choice.class';
import { Story } from '../story/story.class';

export class GenerateChoicesDto {
  story: Story;
  numberOfChoices: number;
}

@Controller()
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Post('generate')
  generateChoices(@Body() body: GenerateChoicesDto): Promise<Choice[]> {
    return this.choiceService.generateChoices(body);
  }
}
