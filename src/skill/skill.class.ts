export class Skill {
  name: string;
  description: string;
  cost: number;
  effect: SkillEffect[];
}

export class SkillEffect {
  targetProperty: SKillTargetPropertyEnum;
  value: number;
  targetCharacter: SkillTargetCharacterEnum;
}

export enum SkillTargetCharacterEnum {
  self = 'self',
  enemy = 'enemy',
}

export enum SKillTargetPropertyEnum {
  health = 'health',
  mana = 'mana',
  attack = 'attack',
  defense = 'defense',
}
