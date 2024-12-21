import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config/dist";
import {GenerativeModel, GoogleGenerativeAI} from "@google/generative-ai";
import {MonsterSkillType, monstersSchema} from "./schema/Monsters.schema";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

export enum MonsterBiome {
  Forest = "forest",
  Mountain = "mountain",
  Swamp = "swamp",
  Crypt = "crypt"
}

export enum MonsterLevelDescription {
  level_1 = "should look weak, easy to fight"
}

export class MonsterGenerationData {
  level: number;
  numberOfMonsters: number;
  biome: MonsterBiome;
  withPictures?: boolean = false;
}

export class Monster {
  name: string;
  level: number;
  description: string;
  health: number;
  attack: number;
  mana: number;
  skills : MonsterSkill[];
  picture?: string;
}

export class MonsterSkill {
  name: string;
  cost: number;
  skillType: MonsterSkillType;
  value: number;
}

@Injectable()
export class AppService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private configService: ConfigService,
              private httpsService: HttpService) {
    const apiKey = this.configService.get('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  }

  async generateMonsters(data: MonsterGenerationData) {

    const prompt =
      "create a list of " + data.numberOfMonsters + " level " + data.level + " monsters with " +
      "random health between 10 and 20," +
      "random attack between 1 and 5," +
      "5 mana," +
      "based on a " + data.biome + " environment," +
      MonsterLevelDescription["level_" + data.level] +
      "with 1 skill, " +
      "each field should be filled";

    console.log("Generating monsters for prompt: "  + prompt);

    this.model.generationConfig.responseMimeType = "application/json";
    this.model.generationConfig.responseSchema = monstersSchema;
    const result = await this.model.generateContent(prompt);
    const monsterJSONArray : Monster[] = JSON.parse(result.response.text());

    if(data.withPictures) {
      for (let monster of monsterJSONArray) {
        console.log("Generating picture for monster: " + monster.name + " with description: " + monster.description);
        const body = {
          "key": this.configService.get('STABLE_DIFFUSION_API_KEY'),
          "prompt": monster.description,
          "samples": "1"
        }

        const response = await firstValueFrom(
          this.httpsService.post("https://stablediffusionapi.com/api/v3/text2img", body, {
            headers: {
              "Content-Type": "application/json"
            }
          })
        )
        monster.picture = response.data.output[0];
      }
    }

    return monsterJSONArray;
  }
}
