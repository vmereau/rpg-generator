import {ResponseSchema, SchemaType} from "@google/generative-ai";
import {ChoiceType} from "./choice.class";

export const choiceSchema: ResponseSchema =  {
  description: "Complete schema of the generated choices",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        description: "Title of the choice",
        nullable: false
      },
      description: {
        type: SchemaType.STRING,
        description: "Short description of the choice",
        nullable: false
      },
      type: {
        type: SchemaType.STRING,
        enum: Object.values(ChoiceType),
        description: "The type of the choice",
        nullable: false,
      },
    }
  }
}
