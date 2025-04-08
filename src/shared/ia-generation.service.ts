import {Inject, Injectable} from '@nestjs/common';
import {GoogleGenAI} from "@google/genai";
import {GenerativeModel, ResponseSchema} from "@google/generative-ai";

@Injectable()
export class IaGenerationService {

  constructor(@Inject('GENAI_IMG_MODEL') private imgModel: GoogleGenAI,
              @Inject('GENAI_MODEL') private textModel: GenerativeModel,) {}

  public async generateImg(prompt: string) {
    return await this.imgModel.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        responseModalities: ['Text', 'Image']
      },
    });
  }

  public async generateText(prompt: string, schema: ResponseSchema) {
    this.textModel.generationConfig.responseMimeType = 'application/json';
    this.textModel.generationConfig.responseSchema = schema;

    return await this.textModel.generateContent(prompt);
  }
}
