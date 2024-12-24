import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel} from "@google/generative-ai";
import {HttpService} from "@nestjs/axios";
import {storySchema} from "./story.schema";
import {validateStoryProperties} from "./story.utils";
import {NoValidStoryException} from "./story.errors";
import {Story} from "./story.class";


@Injectable()
export class StoryService {
  private generatedStory: Story;

  constructor(private configService: ConfigService,
              private httpsService: HttpService,
              @Inject('GENAI_MODEL') private model: GenerativeModel) {}

  async generateStory() {

    let prompt =
      "generate a new story with a name, a summary and a biome. The story should be about an unnamed adventurer going somewhere to fight monsters and do something " +
      "like saving someone, finding a relic or just general exploration of uncharted lands" +
      "At the end of the story, to succeed, the adventurer must fight an epic foe. Return its name." +
      "the generated story should be totally different than the previous one";

    console.log("Generating Story...");

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = storySchema;
    const result = await this.model.generateContent(prompt);
    const generatedStory : Story = JSON.parse(result.response.text());
    console.log("story generated and parsed, checking integrity ...");

    const errors = validateStoryProperties(generatedStory)

    if(errors.length !== 0){
      console.log("Something went wrong in this Story generation, skipping and logging errors...");
      throw new NoValidStoryException(errors);
    }

    console.log("generated Story seems valid");

    this.generatedStory = generatedStory;
    return generatedStory;
  }

  getGeneratedStory(): Story {
    return this.generatedStory;
  }
}
