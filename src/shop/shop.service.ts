import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { HttpService } from '@nestjs/axios';
import { GenerateShopDto } from './shop.controller';
import { shopSchema } from './shop.schema';
import { validateShopProperties } from './shop.utils';
import { NoValidShopException } from './shop.errors';
import { Shop } from './shop.class';
import { IaGenerationService } from '../core/ia-generation.service';
import { ShopExamples } from './shop.example';

@Injectable()
export class ShopService {
  constructor(
    private configService: ConfigService,
    private httpsService: HttpService,
    private iaGenerationService: IaGenerationService
  ) {}

  public async generateShop(data: GenerateShopDto) {
    /*let prompt =
      `generate a shop of ${data.numberOfItems} level ${data.level} items, ` +
      `the items should be fit for the following adventurer archetype: ${data.adventurerArchetype} and have one or multiple effects, ` +
      'add a short description for the shop keeper';*/

    let prompt =
      `generate a shop of ${data.numberOfItems} level ${data.level} items, ` +
      `the items should be fit for the following adventurer archetype: "${data.adventurerArchetype}" and have one or multiple effects`;

    if (data.biome) {
      prompt += `, the shop should fit in the following biome: "${data.biome}". `;
    }

    prompt += `Respond with in a JSON, you can inspire yourself with the examples provided below: 
    ${JSON.stringify(ShopExamples[0])}`;

    console.log('Generating shop...');
    console.log(prompt);
    const result = await this.iaGenerationService.generateTextV2(
      prompt,
      shopSchema
    );
    console.log(result.text);
    const generatedShop: Shop = JSON.parse(result.text);
    console.log(generatedShop);
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
