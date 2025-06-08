import inquirer from 'inquirer';
import { BusinessInfo } from './types/businessInfo.js';

const questions = [
  // Basic Information
  { type: 'input', name: 'name', message: 'What is your business name?' },
  { type: 'input', name: 'industry', message: 'What industry is your business in?' },
  { type: 'input', name: 'description', message: 'Please provide a brief description of your business:' },
  { type: 'input', name: 'location', message: 'Where is your business located?' },
  
  // Target Audience
  { type: 'input', name: 'targetAudience', message: 'Who is your target audience?' },
  { type: 'input', name: 'audienceAgeRange', message: 'What is the age range of your target audience?' },
  { type: 'input', name: 'audienceIncomeLevel', message: 'What is the income level of your target audience?' },
  { type: 'input', name: 'audiencePainPoints', message: 'What are the main pain points your target audience faces?' },
  
  // Competitive Analysis
  { type: 'input', name: 'competitors', message: 'Who are your main competitors?' },
  { type: 'input', name: 'uniqueValueProposition', message: 'What is your unique value proposition?' },
  { type: 'input', name: 'keyDifferentiators', message: 'What are your key differentiators from competitors?' },
  
  // Business Goals
  { type: 'input', name: 'goals', message: 'What are your business goals?' },
  { type: 'input', name: 'timeline', message: 'What is your timeline for achieving these goals?' },
  { type: 'input', name: 'successMetrics', message: 'How will you measure success?' },
  
  // Budget
  { type: 'input', name: 'budget', message: 'What is your monthly ad budget?' },
  { type: 'input', name: 'budgetAllocation', message: 'How would you like to allocate this budget across channels?' },
  
  // Current Marketing
  { type: 'input', name: 'currentChannels', message: 'What marketing channels are you currently using?' },
  { type: 'input', name: 'currentResults', message: 'What results are you seeing from current marketing efforts?' },
  { type: 'input', name: 'marketingChallenges', message: 'What are your main marketing challenges?' }
];

export async function collectBusinessInfo(): Promise<BusinessInfo> {
  const answers = await inquirer.prompt(questions);
  return answers as BusinessInfo;
} 