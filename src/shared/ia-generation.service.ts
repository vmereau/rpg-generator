import {Global, Inject, Injectable} from '@nestjs/common';
import {GoogleGenAI} from "@google/genai";

@Injectable()
export class IaGenerationService {

  constructor(@Inject('GENAI_IMG_MODEL') private imgModel: GoogleGenAI) {}

  public async generateImg(prompt: string) {
    return await this.imgModel.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        responseModalities: ['Text', 'Image']
      },
    });

    /*for (const part of response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync('gemini-native-image.png', buffer);
        console.log('Image saved as gemini-native-image.png');
      }
    }*/
  }
}
