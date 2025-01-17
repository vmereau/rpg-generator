import { ResponseSchema, SchemaType } from '@google/generative-ai';
import {
  SkillTargetCharacterEnum,
} from './skill.class';
import {CharacterUpdatableNumberProperties} from "../core/character/character.class";

export const skillSchema: ResponseSchema = {
  description: 'Complete schema of the generated skill',
  type: SchemaType.OBJECT,
  nullable: true,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: 'The name of the skill',
      nullable: false,
    },
    description: {
      type: SchemaType.STRING,
      description: 'The description of the skill',
      nullable: false,
    },
    cost: {
      type: SchemaType.INTEGER,
      description: 'The cost of the skill',
      nullable: true,
    },
    effects: {
      type: SchemaType.ARRAY,
      description: 'The effects of the skill',
      nullable: false,
      items: {
        type: SchemaType.OBJECT,
        nullable: false,
        properties: {
          targetProperty: {
            type: SchemaType.STRING,
            description: 'the targeted property of this effect',
            nullable: false,
            enum: Object.values(CharacterUpdatableNumberProperties),
          },
          value: {
            type: SchemaType.INTEGER,
            description: 'The value of the effect, negative or positive',
            nullable: false,
          },
          targetCharacter: {
            type: SchemaType.STRING,
            description: 'The targeted character',
            nullable: false,
            enum: Object.values(SkillTargetCharacterEnum),
          },
        },
      },
    },
  },
};
