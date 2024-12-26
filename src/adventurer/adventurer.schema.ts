import {ResponseSchema, SchemaType} from "@google/generative-ai";

export const adventurerSchema: ResponseSchema =  {
  description: "Complete schema of the generated adventurer",
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: "Name of the adventurer",
      nullable: false
    },
    health: {
      type: SchemaType.INTEGER,
      description: "Health points of the adventurer",
      nullable: false,
    },
    attack: {
      type: SchemaType.INTEGER,
      description: "Attack of the adventurer",
      nullable: false,
    },
    level: {
      type: SchemaType.INTEGER,
      description: "The level of the adventurer",
      nullable: false,
    },
    description: {
      type: SchemaType.STRING,
      description: "The visual description of the adventurer",
      nullable: false,
    },
    mana: {
      type: SchemaType.INTEGER,
      description: "Mana points of the adventurer",
      nullable: false
    },
    defense: {
      type: SchemaType.INTEGER,
      description: "Defense of the adventurer",
      nullable: false
    },
    archetype : {
      type: SchemaType.STRING,
      description: "The archetype of the adventurer",
      nullable: false,
    }
  }
}
