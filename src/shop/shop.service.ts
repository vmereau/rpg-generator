import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { GenerativeModel } from '@google/generative-ai';
import { HttpService } from '@nestjs/axios';
import { GenerateShopDto } from './shop.controller';
import { shopSchema } from './shop.schema';
import { validateShopProperties } from './shop.utils';
import { NoValidShopException } from './shop.errors';
import { Shop } from './shop.class';
import {IaGenerationService} from "../shared/ia-generation.service";

@Injectable()
export class ShopService {
  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateShop(data: GenerateShopDto) {
    let prompt =
      `generate a shop of ${data.numberOfItems} level ${data.level} items, ` +
      `the items should be fit for the following adventurer archetype: ${data.adventurerArchetype} and have one or multiple effects` +
      'add a short description for the shop keeper';

    if (data.biome) {
      prompt += ` the shop should fit in the following biome: ${data.biome}`;
    }

    console.log('Generating shop...');
    const result = await this.iaGenerationService.generateText(prompt, shopSchema);
    const generatedShop: Shop = JSON.parse(result.response.text());
    console.log('shop generated and parsed, checking integrity ...');

    const errors = validateShopProperties(generatedShop);
    if (errors.length !== 0) {
      console.log(
        'Something went wrong in this shop generation, skipping and logging errors...'
      );
      throw new NoValidShopException(errors);
    }

    console.log('generated Shop seems valid');
    return generatedShop;
  }
}
