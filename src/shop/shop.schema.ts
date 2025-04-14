import { itemSchema } from '../items/item.schema';
import { SchemaUnion, Type } from '@google/genai';

export const shopSchema: SchemaUnion = {
  description: 'Complete schema of the generated Shop',
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'the name of the shop',
      nullable: false,
    },
    shopkeeper_description: {
      type: Type.STRING,
      description: 'Short description of the shopkeeper',
    },
    goods: {
      type: Type.ARRAY,
      description: 'Item array representing the goods sellable by this shop',
      nullable: false,
      items: itemSchema,
    },
  },
};
