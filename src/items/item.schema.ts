import { ItemTypeEnum } from './item.class';
import { CharacterUpdatableNumberProperties } from '../core/character/character.class';
import { SchemaUnion, Type } from '@google/genai';

export const itemSchema: SchemaUnion = {
  description: 'Complete schema of the generated Item',
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'Name of the item',
      nullable: false,
    },
    cost: {
      type: Type.INTEGER,
      description: 'The cost of the item',
      nullable: false,
    },
    level: {
      type: Type.INTEGER,
      description: 'The level of the item',
      nullable: false,
    },
    description: {
      type: Type.STRING,
      description: 'Short description of the item',
      nullable: false,
    },
    type: {
      type: Type.STRING,
      description: 'The type of the item',
      nullable: false,
      enum: Object.values(ItemTypeEnum),
    },
    effects: {
      type: Type.ARRAY,
      description: 'The effects of the item',
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
        },
      },
    },
  },
};
