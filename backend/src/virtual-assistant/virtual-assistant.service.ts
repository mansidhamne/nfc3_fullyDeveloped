import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VirtualAssistantService {
  private readonly apiUrl = 'https://api.openai.com/v1/completions';
  private readonly apiKey = process.env.OPENAI_API_KEY;

  async getStudySuggestions(prompt: string): Promise<any> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'text-davinci-003', // Use the appropriate model
          prompt: prompt,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch study suggestions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
