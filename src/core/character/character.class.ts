import { Skill } from '../../skill/skill.class';

export class Character {
  name: string;
  level: number;
  description: string;
  health: number;
  attack: number;
  mana: number;
  defense: number;
  skills: Skill[];
  picture?: string;
}
