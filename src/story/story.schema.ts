import {ResponseSchema, SchemaType} from "@google/generative-ai";

export const storySchema: ResponseSchema =  {
  description: "Complete schema of the generated Shop",
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: "the name of the story",
      nullable: false
    },
    story_summary: {
      type: SchemaType.STRING,
      description: "Summary of the story"
    },
    biome: {
      type: SchemaType.STRING,
      description: "The biome where the story takes place, example: Desert, ruined city, mountain, dungeon",
    },
    boss_name: {
      type: SchemaType.STRING,
      description: "The name of the boss that the adventurers must fight at the end of the story",
    }
  }
}
