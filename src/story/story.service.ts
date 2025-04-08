import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config/dist';
import {HttpService} from '@nestjs/axios';
import {storySchema} from './story.schema';
import {validateStoryProperties} from './story.utils';
import {NoValidStoryException} from './story.errors';
import {Story} from './story.class';
import {GenerateStoryDto} from './story.controller';
import {IaGenerationService} from "../shared/ia-generation.service";

@Injectable()
export class StoryService {
  private generatedStory: Story;
  private previousBiomes: string[] = [];
  private previousBiomesMaxSize = 5;

  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateStory(data: GenerateStoryDto) {
    const premise: string = data.premise;

    let prompt = `generate a new and original story with a boss to defeat, the story should be in another biome than the following ones : ${this.previousBiomes.join(
      ', '
    )}`;

    if (premise) {
      prompt += `the user wants the story to be based around or include the following: ${premise}`;
    }

    console.log('Generating Story...');

    const result = await this.iaGenerationService.generateText(prompt, storySchema);
    const generatedStory: Story = JSON.parse(result.response.text());
    console.log('story generated and parsed, checking integrity ...');

    const errors = validateStoryProperties(generatedStory);

    if (errors.length !== 0) {
      console.log(
        'Something went wrong in this Story generation, skipping and logging errors...'
      );
      throw new NoValidStoryException(errors);
    }

    console.log('generated Story seems valid');

    this.generatedStory = generatedStory;
    this.addToPreviousBiomes(this.generatedStory.biome);

    return generatedStory;
  }

  public async generateStoryImg(story?: Story) {
    const prompt = `Generate an image for the following story: '${story.name}', set in the following biome: '${story.biome}'`;

    console.log(prompt);

    return await this.iaGenerationService.generateImg(prompt);
  }

  private addToPreviousBiomes(biome: string): void {
    this.previousBiomes.push(biome);

    if (this.previousBiomes.length > this.previousBiomesMaxSize) {
      this.previousBiomes.shift();
    }
  }
}
