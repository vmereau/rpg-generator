import {ResponseSchema, SchemaType} from "@google/generative-ai";

export const monstersSchema: ResponseSchema =  {
  description: "Complete schema of the generated monster list",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING,
        description: "Name of the monster",
        nullable: false
      },
      health: {
        type: SchemaType.INTEGER,
        description: "Health points of the monster",
        nullable: false,
      },
      attack: {
        type: SchemaType.INTEGER,
        description: "Attack of the monster",
        nullable: false,
      },
      level: {
        type: SchemaType.INTEGER,
        description: "The level of the monster",
        nullable: false,
      },
      description: {
        type: SchemaType.STRING,
        description: "The visual description of the monster",
        nullable: true,
      },
      mana: {
        type: SchemaType.INTEGER,
        description: "Mana points of the monster",
        nullable: true
      },
      defense: {
        type: SchemaType.INTEGER,
        description: "Defense of the monster",
        nullable: true
      }
    }
  }
}
