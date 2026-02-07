
import { GoogleGenAI, Type } from "@google/genai";
import { Case, Language, Difficulty } from "./types";

/**
 * Generates a visual sketch using the standard Flash image model.
 */
export async function generateVisualSketch(prompt: string): Promise<string> {
  const rawKey = process.env.API_KEY;
  if (!rawKey) return "";
  const apiKey = rawKey.trim();

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A forensic black and white evidence sketch: ${prompt}. Minimalist Noir style, pencil on paper, evidence tag in corner.` }]
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
    console.warn("Visual generation skipped (Sketch Engine):", e.message);
    return "";
  }
}

/**
 * Main Case Generation function using Gemini 3 Flash.
 * Focuses strictly on logic, deduction, and evidence contradictions.
 */
export async function generateCase(language: Language, difficulty: Difficulty = 'Medium'): Promise<Case> {
  const rawKey = process.env.API_KEY;
  
  if (!rawKey) {
    throw new Error("CRITICAL: API_KEY is missing from environment variables.");
  }

  const apiKey = rawKey.trim();
  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are a Pure Logic Deduction Engine. 
    TASK: Generate a complex investigation dossier based on logical contradictions.
    
    STRICT RULES:
    1. ZERO narrative, storytelling, or flavor text. No "Detective, we have a problem".
    2. THE PUZZLE: Exactly one suspect's alibi (location/time) must be mathematically impossible based on one forensic evidence item.
    3. Use exact timestamps (e.g., 14:45) and distances.
    4. Suspect IDs must be 's1', 's2', 's3'.
    5. Text fields MUST be provided for keys 'en', 'fr', and 'ar'.
    6. Include [RECONSTRUCT] in the description of one piece of evidence for visual processing.
    
    OUTPUT: Valid JSON matching the schema.
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ text: `Generate a logic dossier. Difficulty: ${difficulty}.` }]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema
      }
    });

    if (!response.text) throw new Error("Received empty text from Gemini.");
    
    const caseData = JSON.parse(response.text.trim());
    
    // Process visual reconstructions
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
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    // Rethrow with better formatting for the UI alert
    throw new Error(err.message || "Unknown error during AI generation.");
  }
}
