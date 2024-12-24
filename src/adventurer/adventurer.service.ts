import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel} from "@google/generative-ai";
import {HttpService} from "@nestjs/axios";
import {Character} from "../core/character.entity";
import {adventurerSchema} from "./adventurer.schema";

export class Adventurer extends Character {
  archetype: string;
}

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
      "a base of 5 plus a random integer between 5 and 10 for his mana " +
      "with no skill, " +
      // "add a skill with a name that fits the adventurer's description, " +
      "each field should be filled";

    console.log("Generating Adventurer...");

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = adventurerSchema;
    const result = await this.model.generateContent(prompt);
    const generatedAdventurer : Adventurer = JSON.parse(result.response.text());

    console.log("adventurers generated and parsed, checking integrity ...");

    /**const errors = validateStoryProperties(generatedStory)

    if(errors.length === 0){
      console.log("generated Story seems valid");
    } else {
      console.log("Something went wrong in this Story generation, skipping and logging errors...");
      console.log(errors);
      throw new NoValidStoryException(errors);
    }**/

    this.generatedAdventurer = generatedAdventurer;
    return generatedAdventurer;
  }

  getGeneratedAdventurer(): Adventurer {
    return this.generatedAdventurer;
  }
}
