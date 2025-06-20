import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getIdeasFromOpenAI(lat: number, lon: number, mood?: string): Promise<string[]> {
  const prompt = `
You are a local date night expert. Generate 10 creative, fun, and unique date night ideas for couples located near:
Latitude: ${lat}
Longitude: ${lon}

Each idea should be:
- Location-specific (nearby places or Austin if coords are close)
- Include a mix of indoor/outdoor ideas
- Vary in budget (free to $$$)
${mood ? `- Aligned with the mood: "${mood}"` : ''}
Format:
1. [idea]
2. [idea]
...
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-2025-04-14',
    messages: [{ role: 'user', content: prompt }],
    temperature: 1,
  });

  const text = response.choices[0]?.message?.content ?? '';
  return text.split(/\n\d+\.\s/).filter(Boolean).map((s, i) => `${i + 1}. ${s.trim()}`);
}
