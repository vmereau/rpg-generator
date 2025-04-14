import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { GoogleGenAI } from '@google/genai';
import { IaGenerationService } from './shared/ia-generation.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'GENAI_MODEL_V2',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get('GEMINI_API_KEY');

        return new GoogleGenAI({ apiKey: apiKey });
      },
    },
    IaGenerationService,
  ],
  exports: [IaGenerationService],
})
export class GlobalModule {}
