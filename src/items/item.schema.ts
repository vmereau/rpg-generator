import { ResponseSchema, SchemaType } from '@google/generative-ai';

export const itemSchema: ResponseSchema = {
  description: 'Complete schema of the generated Item',
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: 'Name of the item',
      nullable: false,
    },
    cost: {
      type: SchemaType.INTEGER,
      description: 'The cost of the item',
      nullable: false,
    },
    level: {
      type: SchemaType.INTEGER,
      description: 'The level of the item',
      nullable: false,
    },
    description: {
      type: SchemaType.STRING,
      description: 'Short description of the item',
      nullable: false,
    },
    damage: {
      type: SchemaType.INTEGER,
      description: 'If the item is a weapon, this is its damage inflicted',
      nullable: true,
    },
    defense: {
      type: SchemaType.INTEGER,
      description: 'If the item is an armor, this is its defense',
      nullable: true,
    },
  },
};
