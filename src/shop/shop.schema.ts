import { ResponseSchema, SchemaType } from '@google/generative-ai';
import { itemSchema } from '../items/item.schema';

export const shopSchema: ResponseSchema = {
  description: 'Complete schema of the generated Shop',
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: 'the name of the shop',
      nullable: false,
    },
    shopkeeper_description: {
      type: SchemaType.STRING,
      description: 'Short description of the shopkeeper',
    },
    goods: {
      type: SchemaType.ARRAY,
      description: 'Item array representing the goods sellable by this shop',
      nullable: false,
      items: itemSchema,
    },
  },
};
