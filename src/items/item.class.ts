import { CharacterUpdatableNumberProperties } from '../core/character/character.class';

export class Item {
  name: string;
  cost: number;
  level: number;
  description: string;
  type: ItemTypeEnum;
  effects: ItemEffect[];
}

export class ItemEffect {
  targetProperty: CharacterUpdatableNumberProperties;
  value: number;
}

export enum ItemTypeEnum {
  equipment = 'equipment',
  consumable = 'consumable',
}
