import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel} from "@google/generative-ai";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {NoValidMonstersException} from "./monsters.errors";
import {monstersSchema} from "./Monsters.schema";
import {validateMonsterProperties} from "./monsters.utils";
import {Character} from "../core/character.entity";
import {GenerateMonstersDto} from "./monsters.controller";

export enum MonsterLevelDescription {
  level_1 = "a weak monster",
  level_2 = "an average looking monster",
  level_3 = "a strong looking monster",
  level_4 = "a giant epic monster"
}

export class Monster extends Character {}

@Injectable()
export class MonstersService {
  private generatedMonsters: Monster[] = [];

  constructor(private configService: ConfigService,
              private httpsService: HttpService,
              @Inject('GENAI_MODEL') private model: GenerativeModel) {}

  async generateMonsters(data: GenerateMonstersDto) {

    const prompt =
      "create a list of " + data.number + " level " + data.level + " monsters with " +
      "health being a base of 10 plus a random number between 1 and 10 multiplied by their level," +
      "attack being 1 plus a random number between 1 and 4 multiplied by their level," +
      "mana being 1 plus a random number between 1 and 4 multiplied by their level," +
      "based on a " + data.biome + " environment," +
      "its name and short description should feel like " + MonsterLevelDescription["level_" + data.level] +
      "with 0 skill, " +
      "each field should be filled";

    console.log("Generating monsters...");

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = monstersSchema;
    const result = await this.model.generateContent(prompt);
    const monsterJSONArray : Monster[] = JSON.parse(result.response.text());
    console.log("monsters generated and parsed, checking integrity ...");

    const monsters = [];
    monsterJSONArray.forEach((monster) => {
      const errors = validateMonsterProperties(monster)
      if(errors.length === 0){
        console.log("added: " + monster.name);
        monsters.push(monster);
      } else {
        console.log("Something went wrong in this monster generation, skipping and logging errors...");
        console.log(errors);
      }
    })

    if(monsters.length === 0){
      console.log("no valid monsters created");
      throw new NoValidMonstersException();
    }

    if(data.withPictures) {
      for (let monster of monsters) {
        console.log("Generating picture for monster: " + monster.name + " with description: " + monster.description);
        const body = {
          "key": this.configService.get('STABLE_DIFFUSION_API_KEY'),
          "prompt": "generate a creature, its name is: " + monster.name + ", should look like: " + monster.description + " with a background of " + data.biome,
          "samples": "1"
        }

        const response = await firstValueFrom(
          this.httpsService.post("https://stablediffusionapi.com/api/v3/text2img", body, {
            headers: {
              "Content-Type": "application/json"
            }
          })
        )

        if(response.data.status === "error"){
          console.log("monster picture not generated / saved, api error: ");
          console.log(response.data.message);
          continue;
        }

        monster.picture = response.data.output[0];
      }
    }

    this.generatedMonsters.push(...monsters);

    return monsters;
  }

  getGeneratedMonsters(): Monster[] {
    return this.generatedMonsters;
  }
}
