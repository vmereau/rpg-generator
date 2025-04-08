import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config/dist';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {GoogleGenAI} from "@google/genai";
import {IaGenerationService} from "./shared/ia-generation.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'GENAI_MODEL',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get('GEMINI_API_KEY');
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      },
    },
    {
      provide: 'GENAI_IMG_MODEL',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get('GEMINI_API_KEY');

        return new GoogleGenAI({apiKey: apiKey});
      },
    },
    IaGenerationService
  ],
  exports: [IaGenerationService],
})
export class GlobalModule {}
