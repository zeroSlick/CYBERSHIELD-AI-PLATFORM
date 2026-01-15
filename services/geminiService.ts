
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async analyzeThreat(threatData: any) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Perform a deep forensic analysis on this cyber threat telemetry. 
        Assign a Priority Level (P1-P5) and a Risk Score (0.0 - 10.0).
        
        Telemetry: ${typeof threatData === 'string' ? threatData : JSON.stringify(threatData)}`,
        config: {
          systemInstruction: "You are a lead SOC Architect. Assign priority (P1-P5). Output JSON with technical summary and mitigation commands.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              mitigationSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
              riskScore: { type: Type.NUMBER },
              priorityLevel: { type: Type.STRING },
              riskAssessment: { type: Type.STRING }
            },
            required: ["summary", "mitigationSteps", "riskScore", "priorityLevel", "riskAssessment"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("AI Analysis failed:", error);
      return null;
    }
  },

  async generateForensicSummary(caseData: any) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Synthesize a formal forensic conclusion for this evidence: ${JSON.stringify(caseData)}`,
        config: {
          systemInstruction: "You are a Senior Digital Forensics Investigator. Create a formal, legal-grade summary, timeline, and final conclusion.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              narrative: { type: Type.STRING },
              timeline: { type: Type.ARRAY, items: { type: Type.STRING } },
              conclusion: { type: Type.STRING }
            },
            required: ["narrative", "timeline", "conclusion"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Forensic AI Summary failed:", error);
      return null;
    }
  },

  async lookupIndicator(indicator: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Search for threat intelligence on this indicator: ${indicator}`,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are a Threat Intel Analyst. Use Google Search to find recent mentions of this indicator in security blogs, CVEs, or threat feeds. Provide a confidence score (0-100) and classification.",
          // Note: ResponseMimeType "application/json" is often restricted with googleSearch, using text parsing fallback
        },
      });
      return response.text;
    } catch (error) {
      console.error("Intel Lookup failed:", error);
      return "Unable to correlate indicator at this time.";
    }
  }
};
