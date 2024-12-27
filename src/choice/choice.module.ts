import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import {ChoiceController} from "./choice.controller";
import {ChoiceService} from "./choice.service";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [ChoiceController],
  providers: [ChoiceService],
})
export class ChoiceModule {}
