import { describe, it, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { collectBusinessInfo } from '../businessInfo';
import { analyzeBusinessInfo } from '../services/aiAnalysis';

// Mock inquirer
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn()
  }
}));

describe('Marketing Strategy Flow', () => {
  const mockBusinessInfo = {
    // Basic Information
    name: 'Test Spa',
    industry: 'Wellness & Spa',
    description: 'Premium spa services including facials and massages',
    location: 'Denver, CO',
    
    // Target Audience
    targetAudience: 'Affluent professionals',
    audienceAgeRange: '30-50',
    audienceIncomeLevel: '$150K+',
    audiencePainPoints: 'Time constraints, stress management, self-care needs',
    
    // Competitive Analysis
    competitors: 'Luxury spas and wellness centers',
    uniqueValueProposition: 'Premium services at competitive prices with personalized attention',
    keyDifferentiators: 'Owner-operated, flexible scheduling, premium products',
    
    // Business Goals
    goals: 'Acquire 100 new clients in first year',
    timeline: '2024',
    successMetrics: 'Client acquisition cost, repeat visit rate, customer satisfaction',
    
    // Budget
    budget: '2000',
    budgetAllocation: 'Google Ads 60%, Social Media 40%',
    
    // Current Marketing
    currentChannels: 'None',
    currentResults: 'N/A',
    marketingChallenges: 'Building brand awareness, competing with established spas'
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Mock inquirer.prompt to return our test data
    (inquirer.prompt as any).mockResolvedValue(mockBusinessInfo);
  });

  it('should collect business information successfully', async () => {
    const result = await collectBusinessInfo();
    
    // Verify inquirer was called
    expect(inquirer.prompt).toHaveBeenCalled();
    
    // Verify all required fields are present
    expect(result).toHaveProperty('name', mockBusinessInfo.name);
    expect(result).toHaveProperty('industry', mockBusinessInfo.industry);
    expect(result).toHaveProperty('targetAudience', mockBusinessInfo.targetAudience);
    expect(result).toHaveProperty('budget', mockBusinessInfo.budget);
  });

  it('should generate marketing insights based on business information', async () => {
    const insights = await analyzeBusinessInfo(mockBusinessInfo);
    
    // Verify the structure of the insights
    expect(insights).toHaveProperty('marketPositioning');
    expect(insights).toHaveProperty('swotAnalysis');
    expect(insights.swotAnalysis).toHaveProperty('strengths');
    expect(insights.swotAnalysis).toHaveProperty('weaknesses');
    expect(insights.swotAnalysis).toHaveProperty('opportunities');
    expect(insights.swotAnalysis).toHaveProperty('threats');
    
    // Verify channel strategy
    expect(insights.channelStrategy).toBeInstanceOf(Array);
    expect(insights.channelStrategy[0]).toHaveProperty('channel');
    expect(insights.channelStrategy[0]).toHaveProperty('goal');
    
    // Verify campaign structure
    expect(insights.campaignStructure).toBeInstanceOf(Array);
    expect(insights.campaignStructure[0]).toHaveProperty('campaignType');
    expect(insights.campaignStructure[0]).toHaveProperty('targeting');
    
    // Verify budget breakdown
    expect(insights.budgetBreakdown).toBeInstanceOf(Array);
    expect(insights.budgetBreakdown[0]).toHaveProperty('channel');
    expect(insights.budgetBreakdown[0]).toHaveProperty('amount');
    
    // Verify next steps
    expect(insights.nextSteps).toBeInstanceOf(Array);
    expect(insights.nextSteps[0]).toHaveProperty('step');
    expect(insights.nextSteps[0]).toHaveProperty('priority');
  });

  it('should include success criteria and risk assessment', async () => {
    const insights = await analyzeBusinessInfo(mockBusinessInfo);
    
    // Verify success criteria
    expect(insights.successCriteria).toBeInstanceOf(Array);
    expect(insights.successCriteria.length).toBeGreaterThan(0);
    
    // Verify risk assessment
    expect(insights.risks).toBeInstanceOf(Array);
    expect(insights.risks[0]).toHaveProperty('risk');
    expect(insights.risks[0]).toHaveProperty('impact');
    expect(insights.risks[0]).toHaveProperty('mitigation');
  });

  it('should generate appropriate KPIs and optimization schedule', async () => {
    const insights = await analyzeBusinessInfo(mockBusinessInfo);
    
    // Verify KPIs
    expect(insights.kpis).toBeInstanceOf(Array);
    expect(insights.kpis[0]).toHaveProperty('metric');
    expect(insights.kpis[0]).toHaveProperty('target');
    expect(insights.kpis[0]).toHaveProperty('frequency');
    
    // Verify optimization schedule
    expect(insights.optimizationSchedule).toBeInstanceOf(Array);
    expect(insights.optimizationSchedule.length).toBeGreaterThan(0);
  });
}); 