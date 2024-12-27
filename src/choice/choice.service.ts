import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel} from "@google/generative-ai";
import {HttpService} from "@nestjs/axios";
import {Choice} from "./choice.class";
import {choiceSchema} from "./choice.schema";
import {GenerateChoicesDto} from "./choice.controller";

@Injectable()
export class ChoiceService {

  constructor(private configService: ConfigService,
              private httpsService: HttpService,
              @Inject('GENAI_MODEL') private model: GenerativeModel) {}

  public async generateChoices(data: GenerateChoicesDto): Promise<Choice[]> {

    let prompt =
      "an adventurer is progressing in the following story: " +
      `${data.story.name}, ${data.story.story_summary}, happening in ${data.story.biome} ` +
      `he comes to a point where he is faced with ${data.numberOfChoices} different choices to progress his story, generate them.` +
      `he should not be facing the boss (${data.story.boss_name})`;

    console.log("Generating Choices...");

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = choiceSchema;
    const result = await this.model.generateContent(prompt);
    const generatedChoices : Choice[] = JSON.parse(result.response.text());

    console.log("choices generated and parsed, checking integrity ...");

    //todo check integrity

    console.log("generated choices seems valid");

    return generatedChoices;
  }
}
