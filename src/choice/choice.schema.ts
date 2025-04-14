import { ChoiceTypeEnum } from './choice.class';
import { SchemaUnion, Type } from '@google/genai';

export const choiceSchema: SchemaUnion = {
  description: 'Complete schema of the generated choices',
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'Title of the choice',
        nullable: false,
      },
      description: {
        type: Type.STRING,
        description: 'Short description of the choice',
        nullable: false,
      },
      type: {
        type: Type.STRING,
        enum: Object.values(ChoiceTypeEnum),
        description: 'The type of the choice',
        nullable: false,
      },
    },
  },
};
