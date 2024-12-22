import {Body, Controller, Get, Post} from '@nestjs/common';
import {Shop, ShopService} from "./shop.service";
import {ShopType} from "./shop.schema";

export class GenerateShopDto {
  level: number;
  numberOfItems: number;
  type: ShopType;
}

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post("generate")
  generateShop(@Body() body: GenerateShopDto): Promise<Shop> {

    const data: GenerateShopDto = {
      level: body.level || 1,
      type: body.type || ShopType.Weapons,
      numberOfItems: body.numberOfItems || 3
    }

    return this.shopService.generateShop(data);
  }

  @Get()
  getGeneratedShops(): Shop[] {
    return this.shopService.getGeneratedShops();
  }
}
