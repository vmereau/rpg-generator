import { Inject, Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { SchemaUnion } from '@google/genai';

@Injectable()
export class IaGenerationService {
  constructor(@Inject('GENAI_MODEL_V2') private genAI: GoogleGenAI) {}

  public async generateImg(prompt: string) {
    return await this.genAI.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        responseModalities: ['Text', 'Image'],
      },
    });
  }

  public async generateTextV2(prompt: string, schema: SchemaUnion) {
    return await this.genAI.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });
  }
}
