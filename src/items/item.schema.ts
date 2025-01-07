import { ResponseSchema, SchemaType } from '@google/generative-ai';
import { ItemTargetPropertyEnum, ItemTypeEnum } from './item.class';

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
    type: {
      type: SchemaType.STRING,
      description: 'The type of the item',
      nullable: false,
      enum: Object.values(ItemTypeEnum),
    },
    effects: {
      type: SchemaType.ARRAY,
      description: 'The effects of the item',
      nullable: false,
      items: {
        type: SchemaType.OBJECT,
        nullable: false,
        properties: {
          targetProperty: {
            type: SchemaType.STRING,
            description: 'the targeted property of this effect',
            nullable: false,
            enum: Object.values(ItemTargetPropertyEnum),
          },
          value: {
            type: SchemaType.INTEGER,
            description: 'The value of the effect, negative or positive',
            nullable: false,
          },
        },
      },
    },
  },
};
