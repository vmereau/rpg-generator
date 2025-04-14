import { SchemaUnion, Type } from '@google/genai';

export const adventurerSchema: SchemaUnion = {
  description: 'Complete schema of the generated adventurer',
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'Name of the adventurer',
      nullable: false,
    },
    health: {
      type: Type.INTEGER,
      description: 'Health points of the adventurer',
      nullable: false,
    },
    attack: {
      type: Type.INTEGER,
      description: 'Attack of the adventurer',
      nullable: false,
    },
    level: {
      type: Type.INTEGER,
      description: 'The level of the adventurer',
      nullable: false,
    },
    description: {
      type: Type.STRING,
      description: 'The visual description of the adventurer',
      nullable: false,
    },
    mana: {
      type: Type.INTEGER,
      description: 'Mana points of the adventurer',
      nullable: false,
    },
    defense: {
      type: Type.INTEGER,
      description: 'Defense of the adventurer',
      nullable: false,
    },
    archetype: {
      type: Type.STRING,
      description: 'The archetype of the adventurer',
      nullable: false,
    },
  },
};
