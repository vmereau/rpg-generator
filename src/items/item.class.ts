export class Item {
  name: string;
  cost: number;
  level: number;
  description: string;
  type: ItemTypeEnum;
  effects: ItemEffect[];
}

export class ItemEffect {
  targetProperty: ItemTargetPropertyEnum;
  value: number;
}

export enum ItemTargetPropertyEnum {
  health = 'health',
  mana = 'mana',
  attack = 'attack',
  defense = 'defense',
}

export enum ItemTypeEnum {
  equipment = 'equipment',
  consumable = 'consumable',
}
