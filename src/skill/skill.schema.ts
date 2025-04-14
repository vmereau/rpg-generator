import { SkillTargetCharacterEnum } from './skill.class';
import { CharacterUpdatableNumberProperties } from '../core/character/character.class';
import { SchemaUnion, Type } from '@google/genai';

export const skillSchema: SchemaUnion = {
  description: 'Complete schema of the generated skill',
  type: Type.OBJECT,
  nullable: true,
  properties: {
    name: {
      type: Type.STRING,
      description: 'The name of the skill',
      nullable: false,
    },
    description: {
      type: Type.STRING,
      description: 'The description of the skill',
      nullable: false,
    },
    cost: {
      type: Type.INTEGER,
      description: 'The cost of the skill',
      nullable: true,
    },
    effects: {
      type: Type.ARRAY,
      description: 'The effects of the skill',
      nullable: false,
      items: {
        type: Type.OBJECT,
        nullable: false,
        properties: {
          targetProperty: {
            type: Type.STRING,
            description: 'the targeted property of this effect',
            nullable: false,
            enum: Object.values(CharacterUpdatableNumberProperties),
          },
          value: {
            type: Type.INTEGER,
            description: 'The value of the effect, negative or positive',
            nullable: false,
          },
          targetCharacter: {
            type: Type.STRING,
            description: 'The targeted character',
            nullable: false,
            enum: Object.values(SkillTargetCharacterEnum),
          },
        },
      },
    },
  },
};
