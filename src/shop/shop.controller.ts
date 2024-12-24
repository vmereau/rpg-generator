import {Body, Controller, Get, Post} from '@nestjs/common';
import {Shop, ShopService} from "./shop.service";
import {ShopType} from "./shop.schema";

export class GenerateShopDto {
  level: number = 1;
  numberOfItems: number = 3;
  type: ShopType = ShopType.Weapons;
  adventurerArchetype: string = "warrior";
}

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post("generate")
  generateShop(@Body() body: GenerateShopDto): Promise<Shop> {

    return this.shopService.generateShop(body);
  }

  @Get()
  getGeneratedShops(): Shop[] {
    return this.shopService.getGeneratedShops();
  }
}
