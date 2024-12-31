import { Body, Controller, Post } from '@nestjs/common';
import { ShopType } from './shop.schema';
import { ShopService } from './shop.service';
import { Shop } from './shop.class';

export class GenerateShopDto {
  level = 1;
  numberOfItems = 3;
  type: ShopType = ShopType.Weapons;
  adventurerArchetype = 'warrior';
}

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('generate')
  generateShop(@Body() body: GenerateShopDto): Promise<Shop> {
    return this.shopService.generateShop(body);
  }
}
