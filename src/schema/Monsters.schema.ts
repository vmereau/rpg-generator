import {ResponseSchema, SchemaType} from "@google/generative-ai";

export enum MonsterSkillType {
  Attack = "Attack",
  Heal = "Heal",
  Lifesteal = "Lifesteal"
}

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
      skills: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            name: {
              type: SchemaType.STRING,
              description: "The name of the spell",
              nullable: false,
            },
            skillType: {
              type: SchemaType.STRING,
              enum: Object.values(MonsterSkillType),
              description: "The type of the spell",
              nullable: false
            },
            cost: {
              type: SchemaType.INTEGER,
              description: "The cost of the spell",
              nullable: true
            },
            value: {
              type: SchemaType.INTEGER,
              description: "The value of the spell ( health restored or damage inflicted )",
              nullable: false
            }
          }
        }
      }
    }
  }
}
