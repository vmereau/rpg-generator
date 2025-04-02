import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config/dist';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {GoogleGenAI} from "@google/genai";
import {IaGenerationService} from "./shared/ia-generation.service";

export enum GENAITOKENS {
  TEXT =  'GENAI_MODEL',
  IMG = 'GENAI_IMG_MODEL'
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: GENAITOKENS.TEXT,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get('GEMINI_API_KEY');
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      },
    },
    {
      provide: GENAITOKENS.IMG,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get('GEMINI_API_KEY');

        return new GoogleGenAI({apiKey: apiKey});
      },
    },
    IaGenerationService
  ],
  exports: [GENAITOKENS.TEXT, GENAITOKENS.IMG, IaGenerationService],
})
export class GlobalModule {}
