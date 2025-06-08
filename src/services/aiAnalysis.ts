import { BusinessInfo } from '../types/businessInfo.js';

export interface MarketingInsights {
  // Business Analysis
  marketPositioning: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  
  // Target Audience
  audiencePersonas: string[];
  customerJourney: string[];
  
  // Channel Strategy
  channelStrategy: {
    channel: string;
    goal: string;
    budgetAllocation: string;
    kpis: string[];
  }[];
  
  // Campaign Structure
  campaignStructure: {
    campaignType: string;
    targeting: string;
    keywords: string[];
    adCopyRecommendations: string[];
  }[];
  
  // Budget & Timeline
  budgetBreakdown: {
    channel: string;
    amount: string;
    percentage: string;
  }[];
  timeline: {
    phase: string;
    duration: string;
    milestones: string[];
  }[];
  
  // Measurement & Optimization
  kpis: {
    metric: string;
    target: string;
    frequency: string;
  }[];
  optimizationSchedule: string[];
  
  // Implementation Plan
  nextSteps: {
    step: string;
    priority: string;
    timeline: string;
    dependencies: string[];
  }[];
  
  // Risk Assessment
  risks: {
    risk: string;
    impact: string;
    mitigation: string;
  }[];
  successCriteria: string[];
}

// --- Real OpenAI Integration ---
import OpenAI from 'openai';

const openaiApiKey = process.env.OPENAI_API_KEY;

async function callOpenAIForStrategy(businessInfo: BusinessInfo): Promise<MarketingInsights | null> {
  if (!openaiApiKey) return null;
  const openai = new OpenAI({ apiKey: openaiApiKey });

  const systemPrompt = `You are a digital marketing strategist. Given the following business information, generate a comprehensive marketing strategy in JSON format with these sections: Business Analysis (marketPositioning, swotAnalysis), Target Audience (audiencePersonas, customerJourney), Channel Strategy (channelStrategy), Campaign Structure (campaignStructure), Budget & Timeline (budgetBreakdown, timeline), Measurement & Optimization (kpis, optimizationSchedule), Implementation Plan (nextSteps), Risk Assessment (risks, successCriteria).`;

  const userPrompt = `Business Info: ${JSON.stringify(businessInfo, null, 2)}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' },
    max_tokens: 2000
  });

  try {
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content from OpenAI');
    const parsed = JSON.parse(content);
    return parsed as MarketingInsights;
  } catch (e) {
    console.error('Failed to parse OpenAI response:', e);
    return null;
  }
}

export async function analyzeBusinessInfo(businessInfo: BusinessInfo): Promise<MarketingInsights> {
  // Try real OpenAI integration first
  const aiResult = await callOpenAIForStrategy(businessInfo);
  if (aiResult) return aiResult;

  // Fallback: mock insights
  return {
    marketPositioning: `Positioning ${businessInfo.name} as a premium ${businessInfo.industry} provider...`,
    swotAnalysis: {
      strengths: ['Strong unique value proposition', 'Clear target audience'],
      weaknesses: ['Limited marketing budget', 'New to digital marketing'],
      opportunities: ['Growing market demand', 'Digital transformation'],
      threats: ['Competition from established players', 'Market saturation']
    },
    audiencePersonas: [
      `Primary: ${businessInfo.audienceAgeRange} ${businessInfo.targetAudience} with ${businessInfo.audienceIncomeLevel} income`
    ],
    customerJourney: [
      'Awareness through targeted ads',
      'Consideration via content marketing',
      'Conversion through personalized offers'
    ],
    channelStrategy: [
      {
        channel: 'Google Ads',
        goal: 'Lead Generation',
        budgetAllocation: '40%',
        kpis: ['Click-through rate', 'Cost per lead']
      }
    ],
    campaignStructure: [
      {
        campaignType: 'Search',
        targeting: businessInfo.targetAudience,
        keywords: ['relevant', 'industry', 'terms'],
        adCopyRecommendations: ['Focus on unique value proposition']
      }
    ],
    budgetBreakdown: [
      {
        channel: 'Google Ads',
        amount: '400',
        percentage: '40%'
      }
    ],
    timeline: [
      {
        phase: 'Initial Setup',
        duration: '2 weeks',
        milestones: ['Account creation', 'Campaign setup']
      }
    ],
    kpis: [
      {
        metric: 'Conversion Rate',
        target: '3%',
        frequency: 'Weekly'
      }
    ],
    optimizationSchedule: ['Weekly budget review', 'Bi-weekly performance analysis'],
    nextSteps: [
      {
        step: 'Set up Google Ads account',
        priority: 'High',
        timeline: 'Week 1',
        dependencies: ['Business verification']
      }
    ],
    risks: [
      {
        risk: 'Budget constraints',
        impact: 'Limited reach',
        mitigation: 'Focus on high-ROI channels'
      }
    ],
    successCriteria: [
      'Achieve 3% conversion rate',
      'Maintain cost per lead under $50'
    ]
  };
} 