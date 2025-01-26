import { CharacterUpdatableNumberProperties } from '../core/character/character.class';

export class Skill {
  name: string;
  description: string;
  cost: number;
  effects: SkillEffect[];
}

export class SkillEffect {
  targetProperty: CharacterUpdatableNumberProperties;
  value: number;
  targetCharacter: SkillTargetCharacterEnum;
}

export enum SkillTargetCharacterEnum {
  self = 'self',
  enemy = 'enemy',
}
