
import { GoogleGenAI, Type } from "@google/genai";
import { PhishingAnalysis, LogAnalysis } from "../types";

const PHISHING_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    threat_type: {
      type: Type.STRING,
      description: "The category of the threat (e.g., Phishing, Smishing, WhatsApp Scam, Fake Offer).",
    },
    risk_level: {
      type: Type.STRING,
      description: "Severity level: High, Medium, or Low.",
    },
    explanation: {
      type: Type.STRING,
      description: "A simple, jargon-free explanation of why this is risky.",
    },
    recommended_actions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Clear steps for the user to stay safe.",
    },
  },
  required: ["threat_type", "risk_level", "explanation", "recommended_actions"],
};

const LOG_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    detected_patterns: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key suspicious events found in the logs.",
    },
    potential_attack: {
      type: Type.STRING,
      description: "The name of the suspected attack (e.g., Brute Force, Credential Stuffing).",
    },
    risk_level: {
      type: Type.STRING,
      description: "Severity level: High, Medium, or Low.",
    },
    explanation: {
      type: Type.STRING,
      description: "A simple explanation of the risk for non-technical users.",
    },
    mitigation_steps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Immediate steps to secure the system.",
    },
  },
  required: ["detected_patterns", "potential_attack", "risk_level", "explanation", "mitigation_steps"],
};

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzePhishing(content: string): Promise<PhishingAnalysis> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert Cybersecurity Analyst. Analyze the following content (Email, SMS, or URL) for potential threats:
      
      CONTENT:
      "${content}"
      
      Respond strictly in JSON format following the schema. Use simple language that a non-technical person can understand. Avoid complex jargon.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: PHISHING_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text);
  }

  async analyzeLogs(logs: string): Promise<LogAnalysis> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a Senior Security Operations Center (SOC) Analyst. Analyze the following raw server/application logs for suspicious behavior or security incidents:
      
      LOGS:
      "${logs}"
      
      Explain the findings in a way that a junior developer or a student could understand. Suggest immediate mitigation steps. Respond strictly in JSON format.`,
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
