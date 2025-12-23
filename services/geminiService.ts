
import { GoogleGenAI, Type } from "@google/genai";
import { PhishingAnalysis, LogAnalysis } from "../types";

const PHISHING_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    threat_type: {
      type: Type.STRING,
      description: "The category of the threat (e.g., phishing, impersonation, fake offer, malware, etc.).",
    },
    risk_level: {
      type: Type.STRING,
      description: "Severity level: High, Medium, or Low.",
    },
    explanation: {
      type: Type.STRING,
      description: "A simple, non-technical explanation of the risk.",
    },
    recommended_actions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Clear and actionable safety steps for the user.",
    },
  },
  required: ["threat_type", "risk_level", "explanation", "recommended_actions"],
};

const LOG_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    suspicious_activity: {
      type: Type.BOOLEAN,
      description: "True if abnormal or suspicious patterns are identified.",
    },
    possible_attack: {
      type: Type.STRING,
      description: "The type of attack identified (e.g., Brute Force, Credential Stuffing).",
    },
    risk_level: {
      type: Type.STRING,
      description: "Severity level: High, Medium, or Low.",
    },
    explanation: {
      type: Type.STRING,
      description: "Findings explained in simple language for junior developers or students.",
    },
    recommended_actions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Immediate mitigation or preventive steps.",
    },
  },
  required: ["suspicious_activity", "possible_attack", "risk_level", "explanation", "recommended_actions"],
};

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzePhishing(content: string): Promise<PhishingAnalysis> {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await aiInstance.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a cybersecurity analyst. 
      
      TASK:
      Analyze the following message for phishing, scam, or security risks.
      
      MESSAGE CONTENT:
      """
      ${content}
      """
      
      INSTRUCTIONS:
      1. Identify if this message is a phishing attempt, a scam, or legitimate.
      2. Classify the threat type.
      3. Assign a risk level (High, Medium, Low).
      4. Provide a simple, clear explanation of your reasoning.
      5. Suggest actionable steps to stay safe.
      
      RULES:
      - Be conservative. If something looks suspicious, mark as High Risk.
      - Return structured JSON only.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: PHISHING_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    const result: PhishingAnalysis = JSON.parse(text);

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      result.grounding_sources = chunks
        .filter((c: any) => c.web)
        .map((c: any) => ({
          uri: c.web.uri,
          title: c.web.title
        }));
    }

    return result;
  }

  async analyzeLogs(logs: string): Promise<LogAnalysis> {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await aiInstance.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a cybersecurity log analysis expert.
      Task: Analyze the following system logs for suspicious or malicious activity.
      
      Logs:
      """
      ${logs}
      """
      
      Instructions:
      - Identify abnormal or suspicious patterns.
      - Infer possible attack types if applicable.
      - Assign a risk level: High, Medium, or Low.
      - Explain findings in simple language.
      - Suggest mitigation or preventive steps.`,
      config: {
        thinkingConfig: { thinkingBudget: 16384 },
        responseMimeType: "application/json",
        responseSchema: LOG_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text);
  }
}

export const geminiService = new GeminiService();
