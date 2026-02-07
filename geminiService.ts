
import { GoogleGenAI, Type } from "@google/genai";
import { Case, Language, Difficulty } from "./types";

/**
 * Generates a visual sketch using the standard Flash image model.
 * This restores the "Reconstruction" visual feature.
 */
export async function generateVisualSketch(prompt: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Forensic evidence sketch: ${prompt}. Monochrome pencil style, white background, high contrast.` }]
      },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      },
    });
    
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return "";
  } catch (e: any) {
    console.warn("Visual generation skipped due to error:", e.message);
    return "";
  }
}

/**
 * Main Case Generation function using Gemini 3 Flash.
 * Focuses strictly on logic and contradictions.
 */
export async function generateCase(language: Language, difficulty: Difficulty = 'Medium'): Promise<Case> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are a Logic Deduction Engine.
    TASK: Generate a complex investigation dossier based on logical contradictions.
    
    STRICT RULES:
    1. ZERO narrative, storytelling, or flavor text. No detective monologues.
    2. THE PUZZLE: One suspect's reported alibi (location/time) MUST be proven false by one specific piece of evidence.
    3. Ensure the contradiction is mathematically or logically absolute.
    4. All text fields must be provided in English (en), French (fr), and Arabic (ar).
    5. Suspect IDs must be 's1', 's2', 's3'.
    6. Tag the most descriptive piece of evidence with [RECONSTRUCT] for visual generation.
    
    OUTPUT: Valid JSON matching the Case interface schema.
  `;

  const localizedStringSchema = {
    type: Type.OBJECT,
    properties: {
      en: { type: Type.STRING },
      fr: { type: Type.STRING },
      ar: { type: Type.STRING },
    },
    required: ['en', 'fr', 'ar']
  };

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: localizedStringSchema,
      description: localizedStringSchema,
      type: localizedStringSchema,
      difficulty: { type: Type.STRING },
      suspects: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: localizedStringSchema,
            description: localizedStringSchema,
            alibi: localizedStringSchema,
            motive: localizedStringSchema,
          },
          required: ['id', 'name', 'description', 'alibi', 'motive']
        }
      },
      evidence: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: localizedStringSchema,
            description: localizedStringSchema,
            type: { type: Type.STRING },
          },
          required: ['id', 'title', 'description', 'type']
        }
      },
      statements: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            witnessName: localizedStringSchema,
            text: localizedStringSchema,
          },
          required: ['id', 'witnessName', 'text']
        }
      },
      solution: {
        type: Type.OBJECT,
        properties: {
          perpetratorIds: { type: Type.ARRAY, items: { type: Type.STRING } },
          explanation: localizedStringSchema,
        },
        required: ['perpetratorIds', 'explanation']
      }
    },
    required: ['title', 'description', 'type', 'difficulty', 'suspects', 'evidence', 'statements', 'solution']
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [{ text: `Generate a logical deduction puzzle: difficulty=${difficulty}. Focus on alibi vs forensic timestamps.` }]
    },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI server.");
  const caseData = JSON.parse(text.trim());
  
  await Promise.all(caseData.evidence.map(async (item: any) => {
    if (item.description.en.includes('[RECONSTRUCT]')) {
      const prompt = item.description.en.replace('[RECONSTRUCT]', '').trim();
      item.imageUrl = await generateVisualSketch(prompt);
      
      const clean = (s: string) => s.replace('[RECONSTRUCT]', '').trim();
      item.description.en = clean(item.description.en);
      item.description.fr = clean(item.description.fr);
      item.description.ar = clean(item.description.ar);
    }
  }));

  return { ...caseData, id: `case-${Date.now()}` };
}
