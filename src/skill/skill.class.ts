export class Skill {
  name: string;
  description: string;
  cost: number;
  effects: SkillEffect[];
}

export class SkillEffect {
  targetProperty: SkillTargetPropertyEnum;
  value: number;
  targetCharacter: SkillTargetCharacterEnum;
}

export enum SkillTargetCharacterEnum {
  self = 'self',
  enemy = 'enemy',
}

export enum SkillTargetPropertyEnum {
  health = 'health',
  mana = 'mana',
  attack = 'attack',
  defense = 'defense',
}
