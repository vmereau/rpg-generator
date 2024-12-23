import {ResponseSchema, SchemaType} from "@google/generative-ai";
import {itemSchema} from "../items/item.schema";

export enum ShopType {
  Weapons = "Weapons",
  Potions = "Potions",
  Armor = "Armor"
}

export const shopSchema: ResponseSchema =  {
  description: "Complete schema of the generated Shop",
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: "the name of the shop",
      nullable: false
    },
    shopkeeper_description: {
      type: SchemaType.STRING,
      description: "Short description of the shopkeeper"
    },
    shop_type: {
      type: SchemaType.STRING,
      enum: Object.values(ShopType),
      description: "The type of the items sold by this shop",
      nullable: false,
    },
    goods: {
      type: SchemaType.ARRAY,
      description: "Item array representing the goods sellable by this shop",
      nullable: false,
      items: itemSchema
    }
  }
}
