
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
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a cybersecurity analyst. 
      Task: Analyze the following content for phishing or scam risk.
      
      Content:
      """
      ${content}
      """
      
      Instructions:
      - Determine if the content is malicious or safe.
      - Classify the threat type.
      - Assign a risk level: High, Medium, or Low.
      - Explain the risk in simple, non-technical language.
      - Suggest clear and actionable safety steps.
      
      Rules:
      - Be conservative in classification.
      - Do not exaggerate risk.
      - Do not hallucinate facts.
      - Explanation must be understandable by a non-technical user.`,
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
      - Suggest mitigation or preventive steps.
      
      Rules:
      - Do not assume attacks unless evidence exists.
      - Avoid deep technical jargon.
      - Keep explanations concise.`,
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
