import { SchemaUnion, Type } from '@google/genai';

export const storySchema: SchemaUnion = {
  description: 'Complete schema of the generated Shop',
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'the name of the story',
      nullable: false,
    },
    story_summary: {
      type: Type.STRING,
      description: 'Summary of the story',
    },
    biome: {
      type: Type.STRING,
      description:
        'The biome where the story takes place, example: Desert, ruined city, mountain, dungeon',
    },
    boss_name: {
      type: Type.STRING,
      description:
        'The name of the boss that the adventurers must fight at the end of the story',
    },
  },
};
