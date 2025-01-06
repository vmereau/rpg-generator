import { Body, Controller, Post } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { Choice } from './choice.class';
import { Story } from '../story/story.class';
import { validateGenerateChoiceDto } from './choice.utils';
import { GenerateChoiceBodyError } from './choice.error';

export class GenerateChoicesDto {
  story: Story;
  numberOfChoices: number;
}

@Controller()
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Post('generate')
  generateChoices(@Body() body: GenerateChoicesDto): Promise<Choice[]> {
    const errors = validateGenerateChoiceDto(body);
    if (errors.length !== 0) {
      throw new GenerateChoiceBodyError(errors);
    }

    return this.choiceService.generateChoices(body);
  }
}
