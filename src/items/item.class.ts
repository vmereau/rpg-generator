
export class Item {
  name: string;
  cost: number;
  level: number;
  description: string;
}

export class Weapon extends Item {
  damage: number;
}

export class Armor extends Item {
  defense: number;
}
