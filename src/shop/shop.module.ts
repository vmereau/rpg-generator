import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [HttpModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
