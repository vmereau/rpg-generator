import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.class';

export class GenerateShopDto {
  level: number = 1;
  numberOfItems: number = 3;
  adventurerArchetype: string = 'warrior';
  biome?: string;
}

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('generate')
  generateShop(@Body() body: GenerateShopDto): Promise<Shop> {
    return this.shopService.generateShop(body);
  }
}
