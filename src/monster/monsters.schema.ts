import { SchemaUnion, Type } from '@google/genai';

export const monstersSchema: SchemaUnion = {
  description: 'Complete schema of the generated monster list',
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'Name of the monster',
        nullable: false,
      },
      health: {
        type: Type.INTEGER,
        description: 'Health points of the monster',
        nullable: false,
      },
      attack: {
        type: Type.INTEGER,
        description: 'Attack of the monster',
        nullable: false,
      },
      level: {
        type: Type.INTEGER,
        description: 'The level of the monster',
        nullable: false,
      },
      experienceGiven: {
        type: Type.INTEGER,
        description:
          'Experience given when the monster is slain, relative to its level',
        nullable: false,
      },
      goldGiven: {
        type: Type.INTEGER,
        description:
          'Gold given when the monster is slain, relative to its level',
        nullable: false,
      },
      description: {
        type: Type.STRING,
        description: 'The visual description of the monster',
        nullable: true,
      },
      mana: {
        type: Type.INTEGER,
        description: 'Mana points of the monster',
        nullable: true,
      },
      defense: {
        type: Type.INTEGER,
        description: 'Defense of the monster',
        nullable: true,
      },
    },
  },
};
