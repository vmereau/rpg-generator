import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel} from "@google/generative-ai";
import {HttpService} from "@nestjs/axios";
import {skillSchema} from "./skill.schema";
import {
  Skill,
} from "../core/character.entity";
import {GenerateSkillDto} from "./skill.controller";

@Injectable()
export class SkillService {
  private generatedSkill: Skill;

  constructor(private configService: ConfigService,
              private httpsService: HttpService,
              @Inject('GENAI_MODEL') private model: GenerativeModel) {}

  async generateSkill(data: GenerateSkillDto) {

    let prompt =
      "generate an original skill for the following archetype: " + data.archetype + " " +
      "the cost should be 5 multiplied by " + data.level + " " +
      "it can have one or multiple effects, the effect value should be 5 plus a random number between 1 and 5 multiplied by " +data.level + " " +
      "all fields should be filled " +
      "the generated skill should be different than the previous one";

    console.log("Generating Skill ...");

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = skillSchema;
    const result = await this.model.generateContent(prompt);
    const generatedSkill : Skill = JSON.parse(result.response.text());

    console.log("Skill generated and parsed, checking integrity ...");

    /**const errors = validateStoryProperties(generatedStory)

     if(errors.length === 0){
     console.log("generated Story seems valid");
     } else {
     console.log("Something went wrong in this Story generation, skipping and logging errors...");
     console.log(errors);
     throw new NoValidStoryException(errors);
     }**/

    this.generatedSkill = generatedSkill;
    return generatedSkill;
  }

  getGeneratedSkill(): Skill {
    return this.generatedSkill;
  }
}
