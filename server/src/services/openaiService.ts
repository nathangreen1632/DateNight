import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getIdeasFromOpenAI(
  lat: number,
  lon: number,
  mood?: string,
  budget?: string
): Promise<string[]> {
  const randomnessToken = parseInt(randomBytes(3).toString('hex'), 16);

  const prompt = `
You are a local date night expert. Please generate a *fresh* list of 10 creative, fun, and unique date night ideas for couples based near:

Latitude: ${lat}
Longitude: ${lon}

Include:
- Location-specific ideas (mention nearby venues or landmarks)
- A mix of indoor and outdoor experiences
- Variety for different interests
${mood ? `- Tailored to the mood: "${mood}"` : ''}
${budget ? `- Budget level: "${budget}"` : ''}

List format:
1.
2.
3.
...

Randomizer: ${randomnessToken}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-2025-04-14',
    temperature: 1,
    messages: [
      {
        role: 'system',
        content: 'You are a creative assistant helping plan fresh, location-based date night ideas for couples.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? '';
  const matches = raw.match(/\d+\.\s+[\s\S]*?(?=\n\d+\.|\n?$)/g) || [];

  return matches.slice(0, 10).map((idea) => idea.trim());
}
