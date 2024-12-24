import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel} from "@google/generative-ai";
import {HttpService} from "@nestjs/axios";
import {adventurerSchema} from "./adventurer.schema";
import OpenAI from "openai";
import {validateCharacterProperties} from "../core/character/character.utils";
import {CharacterNotValidException} from "../core/character/character.errors";
import {Adventurer} from "./adventurer.class";

@Injectable()
export class AdventurerService {
  private generatedAdventurer: Adventurer;

  constructor(private configService: ConfigService,
              private httpsService: HttpService,
              @Inject('GENAI_MODEL') private model: GenerativeModel) {}

  async generateAdventurer() {

    let prompt =
      "generate a level 1 adventurer " +
      "with a short original description that should include some kind of archetype and a backstory " +
      // "his health, attack and mana properties should reflect his archetype " +
      "his level 1 properties should be : " +
      "a base of 15 plus a random integer between 1 and 15 for his health, " +
      "a base of 3 plus a random integer between 1 and 7 for his attack, " +
      "a base of 5 plus a random integer between 5 and 10 for his mana, " +
      "a base of 5 plus a random integer between 1 and 5 for his defense, " +
      "with no skill, " +
      // "add a skill with a name that fits the adventurer's description, " +
      "each field should be filled " +
      "the generated adventurer should be different than the previous generated ones";

    console.log("Generating Adventurer...");

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = adventurerSchema;
    const result = await this.model.generateContent(prompt);
    const generatedAdventurer : Adventurer = JSON.parse(result.response.text());

    console.log("adventurers generated and parsed, checking integrity ...");

    const errors = validateCharacterProperties(generatedAdventurer);

    if(errors.length !== 0){
      console.log("Something went wrong in this monster generation, logging errors...");
      throw new CharacterNotValidException(errors);
    }

    console.log("generated adventurer seems valid");

    /*const openai = new OpenAI({
      apiKey: this.configService.get("OPENAI_KEY"),
    });

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: generatedAdventurer.description,
      n: 1,
      size: "1024x1024",
    });

    console.log(response.data[0].url);*/

    this.generatedAdventurer = generatedAdventurer;
    return generatedAdventurer;
  }

  getGeneratedAdventurer(): Adventurer {
    return this.generatedAdventurer;
  }
}
