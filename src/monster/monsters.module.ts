import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';

@Module({
  imports: [HttpModule],
  controllers: [MonstersController],
  providers: [MonstersService],
})
export class MonstersModule {}
