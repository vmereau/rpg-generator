import { Routes } from '@nestjs/core';
import {MonstersModule} from "./monsters/monsters.module";

export const appRoutes: Routes = [
  {
    path: 'monsters',
    module: MonstersModule,
  }
];
