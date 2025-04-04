import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config/dist';
import {GenerativeModel} from '@google/generative-ai';
import {HttpService} from '@nestjs/axios';
import {storySchema} from './story.schema';
import {validateStoryProperties} from './story.utils';
import {NoValidStoryException} from './story.errors';
import {Story} from './story.class';
import {GenerateStoryDto} from './story.controller';
import {GENAITOKENS} from "../global.module";
import {IaGenerationService} from "../shared/ia-generation.service";

const fs = require("fs");

@Injectable()
export class StoryService {
  private generatedStory: Story;
  private previousBiomes: string[] = [];
  private previousBiomesMaxSize = 5;

  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService,
    @Inject(GENAITOKENS.TEXT) private textModel: GenerativeModel,
  ) {}

  public async generateStory(data: GenerateStoryDto) {
    const premise: string = data.premise;

    /*let prompt =
      "generate a new and original story (different than the previous ones) with a name, a summary and a biome. " +
      "The story should be about an unnamed adventurer going somewhere to fight monsters and do something " +
      "like saving someone, finding a relic or just general exploration of uncharted lands" +
      "At the end of the story, to succeed, the adventurer must fight an epic foe. Return its name.";*/

    let prompt = `generate a new and original story with a boss to defeat, the story should be in another biome than the following ones : ${this.previousBiomes.join(
      ', '
    )}`;

    if (premise) {
      prompt += `the user wants the story to be based around or include the following: ${premise}`;
    }

    console.log('Generating Story...');

    this.textModel.generationConfig.responseMimeType = 'application/json';
    this.textModel.generationConfig.responseSchema = storySchema;
    const result = await this.textModel.generateContent(prompt);
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
    /*const prompt = `Generate an image for the following story, ${story.name}, set in the ${story.biome} biome,
    with the following premise: ${story.story_summary}`;*/

    const prompt = `Generate an image for the following story: '${story.name}', set in the following biome: '${story.biome}'`;

    console.log(prompt);

    const response = await this.iaGenerationService.generateImg(prompt);

    // return await this.iaGenerationService.generateImg(prompt);

    for (const part of response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync('gemini-native-image.png', buffer);
        console.log('Image saved as gemini-native-image.png');
      }
    }
  }

  private addToPreviousBiomes(biome: string): void {
    this.previousBiomes.push(biome);

    if (this.previousBiomes.length > this.previousBiomesMaxSize) {
      this.previousBiomes.shift();
    }
  }
}
