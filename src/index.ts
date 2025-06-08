import 'dotenv/config';
import { collectBusinessInfo } from './businessInfo';
import { analyzeBusinessInfo } from './services/aiAnalysis';

async function main() {
  try {
    // Collect business information
    const businessInfo = await collectBusinessInfo();
    console.log('\nBusiness Information Summary:');
    console.log('-----------------------------');
    console.log(`Business Name: ${businessInfo.name}`);
    console.log(`Industry: ${businessInfo.industry}`);
    console.log(`Description: ${businessInfo.description}`);
    console.log(`Location: ${businessInfo.location}`);
    
    console.log('\nTarget Audience:');
    console.log(`- Primary: ${businessInfo.targetAudience}`);
    console.log(`- Age Range: ${businessInfo.audienceAgeRange}`);
    console.log(`- Income Level: ${businessInfo.audienceIncomeLevel}`);
    console.log(`- Pain Points: ${businessInfo.audiencePainPoints}`);
    
    console.log('\nCompetitive Analysis:');
    console.log(`- Competitors: ${businessInfo.competitors}`);
    console.log(`- Unique Value Proposition: ${businessInfo.uniqueValueProposition}`);
    console.log(`- Key Differentiators: ${businessInfo.keyDifferentiators}`);
    
    console.log('\nBusiness Goals:');
    console.log(`- Goals: ${businessInfo.goals}`);
    console.log(`- Timeline: ${businessInfo.timeline}`);
    console.log(`- Success Metrics: ${businessInfo.successMetrics}`);
    
    console.log('\nBudget:');
    console.log(`- Monthly Budget: ${businessInfo.budget}`);
    console.log(`- Allocation: ${businessInfo.budgetAllocation}`);
    
    console.log('\nCurrent Marketing:');
    console.log(`- Channels: ${businessInfo.currentChannels}`);
    console.log(`- Results: ${businessInfo.currentResults}`);
    console.log(`- Challenges: ${businessInfo.marketingChallenges}`);

    // Generate marketing insights
    console.log('\nGenerating comprehensive marketing strategy...');
    const insights = await analyzeBusinessInfo(businessInfo);
    
    console.log('\nMarketing Strategy:');
    console.log('==================');
    
    console.log('\n1. Business Analysis:');
    console.log('--------------------');
    console.log(`Market Positioning: ${insights.marketPositioning}`);
    console.log('\nSWOT Analysis:');
    console.log('Strengths:');
    insights.swotAnalysis.strengths.forEach(s => console.log(`- ${s}`));
    console.log('\nWeaknesses:');
    insights.swotAnalysis.weaknesses.forEach(w => console.log(`- ${w}`));
    console.log('\nOpportunities:');
    insights.swotAnalysis.opportunities.forEach(o => console.log(`- ${o}`));
    console.log('\nThreats:');
    insights.swotAnalysis.threats.forEach(t => console.log(`- ${t}`));
    
    console.log('\n2. Target Audience:');
    console.log('------------------');
    console.log('Audience Personas:');
    insights.audiencePersonas.forEach(p => console.log(`- ${p}`));
    console.log('\nCustomer Journey:');
    insights.customerJourney.forEach(s => console.log(`- ${s}`));
    
    console.log('\n3. Channel Strategy:');
    console.log('-------------------');
    insights.channelStrategy.forEach(cs => {
      console.log(`\nChannel: ${cs.channel}`);
      console.log(`Goal: ${cs.goal}`);
      console.log(`Budget Allocation: ${cs.budgetAllocation}`);
      console.log('KPIs:');
      cs.kpis.forEach(k => console.log(`- ${k}`));
    });
    
    console.log('\n4. Campaign Structure:');
    console.log('---------------------');
    insights.campaignStructure.forEach(cs => {
      console.log(`\nCampaign Type: ${cs.campaignType}`);
      console.log(`Targeting: ${cs.targeting}`);
      console.log('Keywords:');
      cs.keywords.forEach(k => console.log(`- ${k}`));
      console.log('Ad Copy Recommendations:');
      cs.adCopyRecommendations.forEach(a => console.log(`- ${a}`));
    });
    
    console.log('\n5. Budget & Timeline:');
    console.log('-------------------');
    console.log('Budget Breakdown:');
    insights.budgetBreakdown.forEach(b => {
      console.log(`- ${b.channel}: ${b.amount} (${b.percentage})`);
    });
    console.log('\nTimeline:');
    insights.timeline.forEach(t => {
      console.log(`\nPhase: ${t.phase}`);
      console.log(`Duration: ${t.duration}`);
      console.log('Milestones:');
      t.milestones.forEach(m => console.log(`- ${m}`));
    });
    
    console.log('\n6. Measurement & Optimization:');
    console.log('---------------------------');
    console.log('KPIs:');
    insights.kpis.forEach(k => {
      console.log(`- ${k.metric}: ${k.target} (${k.frequency})`);
    });
    console.log('\nOptimization Schedule:');
    insights.optimizationSchedule.forEach(o => console.log(`- ${o}`));
    
    console.log('\n7. Implementation Plan:');
    console.log('---------------------');
    insights.nextSteps.forEach(n => {
      console.log(`\nStep: ${n.step}`);
      console.log(`Priority: ${n.priority}`);
      console.log(`Timeline: ${n.timeline}`);
      console.log('Dependencies:');
      n.dependencies.forEach(d => console.log(`- ${d}`));
    });
    
    console.log('\n8. Risk Assessment:');
    console.log('-----------------');
    insights.risks.forEach(r => {
      console.log(`\nRisk: ${r.risk}`);
      console.log(`Impact: ${r.impact}`);
      console.log(`Mitigation: ${r.mitigation}`);
    });
    
    console.log('\nSuccess Criteria:');
    insights.successCriteria.forEach(c => console.log(`- ${c}`));

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main(); 