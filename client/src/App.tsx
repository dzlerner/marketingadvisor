import { useState, useRef, useEffect } from 'react'
import './App.css'

// Types (copy from backend for now)
export interface BusinessInfo {
  name: string;
  industry: string;
  description: string;
  location: string;
  targetAudience: string;
  audienceAgeRange: string;
  audienceIncomeLevel: string;
  audiencePainPoints: string;
  competitors: string;
  uniqueValueProposition: string;
  keyDifferentiators: string;
  goals: string;
  timeline: string;
  successMetrics: string;
  budget: string;
  budgetAllocation: string;
  currentChannels: string;
  currentResults: string;
  marketingChallenges: string;
}

export interface MarketingInsights {
  marketPositioning: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  audiencePersonas: string[];
  customerJourney: string[];
  channelStrategy: { channel: string; goal: string; budgetAllocation: string; kpis: string[] }[];
  campaignStructure: { campaignType: string; targeting: string; keywords: string[]; adCopyRecommendations: string[] }[];
  budgetBreakdown: { channel: string; amount: string; percentage: string }[];
  timeline: { phase: string; duration: string; milestones: string[] }[];
  kpis: { metric: string; target: string; frequency: string }[];
  optimizationSchedule: string[];
  nextSteps: { step: string; priority: string; timeline: string; dependencies: string[] }[];
  risks: { risk: string; impact: string; mitigation: string }[];
  successCriteria: string[];
}

const questions: { key: keyof BusinessInfo; prompt: string; type?: 'text' | 'textarea' | 'select' | 'number'; options?: string[] }[] = [
  { key: 'name', prompt: 'What is your business name?' },
  { key: 'industry', prompt: 'What industry is your business in?', type: 'select', options: ['', 'Retail', 'Health & Wellness', 'Professional Services', 'Food & Beverage', 'Education', 'Technology', 'Other'] },
  { key: 'description', prompt: 'Please provide a brief description of your business:', type: 'textarea' },
  { key: 'location', prompt: 'Where is your business located?' },
  { key: 'targetAudience', prompt: 'Who is your target audience?' },
  { key: 'audienceAgeRange', prompt: 'What is the age range of your target audience?', type: 'select', options: ['', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'] },
  { key: 'audienceIncomeLevel', prompt: 'What is the income level of your target audience?', type: 'select', options: ['', 'Under $50k', '$50k-$100k', '$100k-$150k', '$150k-$200k', 'Over $200k'] },
  { key: 'audiencePainPoints', prompt: 'What are the main pain points your target audience faces?', type: 'textarea' },
  { key: 'competitors', prompt: 'Who are your main competitors?' },
  { key: 'uniqueValueProposition', prompt: 'What is your unique value proposition?', type: 'textarea' },
  { key: 'keyDifferentiators', prompt: 'What are your key differentiators from competitors?', type: 'textarea' },
  { key: 'goals', prompt: 'What are your business goals?', type: 'textarea' },
  { key: 'timeline', prompt: 'What is your timeline for achieving these goals?' },
  { key: 'successMetrics', prompt: 'How will you measure success?' },
  { key: 'budget', prompt: 'What is your monthly ad budget?', type: 'number' },
  { key: 'budgetAllocation', prompt: 'How would you like to allocate this budget across channels?', type: 'select', options: ['', 'Mostly Google Ads', 'Mostly Social Media', 'Even Split', 'Other'] },
  { key: 'currentChannels', prompt: 'What marketing channels are you currently using?' },
  { key: 'currentResults', prompt: 'What results are you seeing from current marketing efforts?', type: 'textarea' },
  { key: 'marketingChallenges', prompt: 'What are your main marketing challenges?', type: 'textarea' },
];

const initialState: BusinessInfo = {
  name: '',
  industry: '',
  description: '',
  location: '',
  targetAudience: '',
  audienceAgeRange: '',
  audienceIncomeLevel: '',
  audiencePainPoints: '',
  competitors: '',
  uniqueValueProposition: '',
  keyDifferentiators: '',
  goals: '',
  timeline: '',
  successMetrics: '',
  budget: '',
  budgetAllocation: '',
  currentChannels: '',
  currentResults: '',
  marketingChallenges: '',
};

const mockAnswers: Partial<BusinessInfo> = {
  name: 'LNO Boutique',
  industry: 'Health & Wellness',
  description: 'A boutique spa specializing in facials and massage for women 35+.',
  location: 'New York, NY',
  targetAudience: 'Wealthier women 35+',
  audienceAgeRange: '35-44',
  audienceIncomeLevel: '$100k-$150k',
  audiencePainPoints: 'Stress, aging skin, lack of self-care time',
  competitors: 'Luxury spas, local wellness centers',
  uniqueValueProposition: 'Personalized, luxury experience with expert staff',
  keyDifferentiators: 'Boutique feel, advanced treatments, loyalty program',
  goals: 'Increase bookings by 30% in 6 months',
  timeline: '6 months',
  successMetrics: 'Number of bookings, customer retention',
  budget: '2000',
  budgetAllocation: 'Mostly Google Ads',
  currentChannels: 'Google Ads, Instagram',
  currentResults: 'Steady bookings, low ad ROI',
  marketingChallenges: 'Standing out in a crowded market',
};

const mockStrategy: MarketingInsights = {
  marketPositioning: 'Positioning LNO Boutique as a premium spa for women 35+ in New York.',
  swotAnalysis: {
    strengths: ['Luxury experience', 'Expert staff'],
    weaknesses: ['High price point', 'Limited brand awareness'],
    opportunities: ['Growing wellness market', 'Digital ad expansion'],
    threats: ['Competition from established spas', 'Economic downturn']
  },
  audiencePersonas: ['Affluent women 35-54, value self-care and luxury'],
  customerJourney: ['Awareness via Google Ads', 'Consideration via Instagram', 'Booking via website'],
  channelStrategy: [
    { channel: 'Google Ads', goal: 'Lead Generation', budgetAllocation: '60%', kpis: ['CTR', 'CPL'] },
    { channel: 'Instagram', goal: 'Brand Awareness', budgetAllocation: '40%', kpis: ['Impressions', 'Followers'] }
  ],
  campaignStructure: [
    { campaignType: 'Search', targeting: 'Women 35+', keywords: ['spa', 'facial', 'massage'], adCopyRecommendations: ['Luxury spa for women 35+', 'Book your facial today'] }
  ],
  budgetBreakdown: [
    { channel: 'Google Ads', amount: '1200', percentage: '60%' },
    { channel: 'Instagram', amount: '800', percentage: '40%' }
  ],
  timeline: [
    { phase: 'Setup', duration: '2 weeks', milestones: ['Account setup', 'Ad creative'] },
    { phase: 'Launch', duration: '1 month', milestones: ['Campaign live', 'Initial optimization'] }
  ],
  kpis: [
    { metric: 'Bookings', target: '30% increase', frequency: 'Monthly' },
    { metric: 'Cost per Lead', target: '<$50', frequency: 'Monthly' }
  ],
  optimizationSchedule: ['Weekly budget review', 'Bi-weekly creative testing'],
  nextSteps: [
    { step: 'Set up Google Ads', priority: 'High', timeline: 'Week 1', dependencies: ['Business verification'] }
  ],
  risks: [
    { risk: 'High competition', impact: 'Lower ROI', mitigation: 'Focus on unique value' }
  ],
  successCriteria: ['30% more bookings', 'Maintain cost per lead under $50']
};

const strategySections = [
  {
    key: 'marketPositioning',
    label: 'Market Positioning',
    getText: (s: MarketingInsights) => `Market Positioning: ${s.marketPositioning}\n\nThis describes how your business is positioned in the market and what makes it unique. For LNO Boutique, we emphasize a premium, luxury experience for women 35+ in New York.`
  },
  {
    key: 'swotAnalysis',
    label: 'SWOT Analysis',
    getText: (s: MarketingInsights) => `SWOT Analysis:\nStrengths: ${s.swotAnalysis.strengths.join(', ')}\nWeaknesses: ${s.swotAnalysis.weaknesses.join(', ')}\nOpportunities: ${s.swotAnalysis.opportunities.join(', ')}\nThreats: ${s.swotAnalysis.threats.join(', ')}\n\nA SWOT analysis helps you understand your business's internal strengths and weaknesses, as well as external opportunities and threats.`
  },
  {
    key: 'audiencePersonas',
    label: 'Audience Personas',
    getText: (s: MarketingInsights) => `Audience Personas: ${s.audiencePersonas.join('; ')}\n\nPersonas represent your ideal customers. Understanding them helps tailor your marketing.`
  },
  {
    key: 'customerJourney',
    label: 'Customer Journey',
    getText: (s: MarketingInsights) => `Customer Journey: ${s.customerJourney.join(' → ')}\n\nThis maps out how a customer discovers, considers, and books your services.`
  },
  {
    key: 'channelStrategy',
    label: 'Channel Strategy',
    getText: (s: MarketingInsights) => `Channel Strategy:\n${s.channelStrategy.map(cs => `${cs.channel}: ${cs.goal}, Budget: ${cs.budgetAllocation}, KPIs: ${cs.kpis.join(', ')}`).join('\n')}\n\nThis section explains which marketing channels to use, their goals, and how to measure success.`
  },
  {
    key: 'campaignStructure',
    label: 'Campaign Structure',
    getText: (s: MarketingInsights) => `Campaign Structure:\n${s.campaignStructure.map(cs => `${cs.campaignType} targeting ${cs.targeting}, Keywords: ${cs.keywords.join(', ')}, Ad Copy: ${cs.adCopyRecommendations.join('; ')}`).join('\n')}\n\nThis details how your campaigns are organized and what messages to use.`
  },
  {
    key: 'budgetBreakdown',
    label: 'Budget Breakdown',
    getText: (s: MarketingInsights) => `Budget Breakdown:\n${s.budgetBreakdown.map(b => `${b.channel}: $${b.amount} (${b.percentage})`).join('\n')}\n\nThis shows how your budget is allocated across channels.`
  },
  {
    key: 'timeline',
    label: 'Timeline',
    getText: (s: MarketingInsights) => `Timeline:\n${s.timeline.map(t => `${t.phase} (${t.duration}): ${t.milestones.join(', ')}`).join('\n')}\n\nThis is your implementation schedule with key milestones.`
  },
  {
    key: 'kpis',
    label: 'KPIs',
    getText: (s: MarketingInsights) => `KPIs:\n${s.kpis.map(k => `${k.metric}: ${k.target} (${k.frequency})`).join('\n')}\n\nKPIs (Key Performance Indicators) help you track progress toward your goals.`
  },
  {
    key: 'optimizationSchedule',
    label: 'Optimization Schedule',
    getText: (s: MarketingInsights) => `Optimization Schedule:\n${s.optimizationSchedule.join(', ')}\n\nThis is how often you should review and optimize your campaigns.`
  },
  {
    key: 'nextSteps',
    label: 'Next Steps',
    getText: (s: MarketingInsights) => `Next Steps:\n${s.nextSteps.map(n => `${n.step} (Priority: ${n.priority}, Timeline: ${n.timeline}, Dependencies: ${n.dependencies.join(', ')})`).join('\n')}\n\nThese are your immediate action items to get started.`
  },
  {
    key: 'risks',
    label: 'Risks',
    getText: (s: MarketingInsights) => `Risks:\n${s.risks.map(r => `${r.risk} (Impact: ${r.impact}, Mitigation: ${r.mitigation})`).join('\n')}\n\nBe aware of these risks and how to address them.`
  },
  {
    key: 'successCriteria',
    label: 'Success Criteria',
    getText: (s: MarketingInsights) => `Success Criteria:\n${s.successCriteria.join(', ')}\n\nThese are the metrics that define success for your marketing efforts.`
  },
];

function BusinessInfoSummary({ info }: { info: BusinessInfo }) {
  return (
    <div className="ga-summary-structured">
      <h2 style={{ marginTop: 0, marginBottom: 18 }}>📝 Business Information Summary</h2>
      <div style={{ marginBottom: 16 }}>
        <b>🏢 Business Name:</b> {info.name || <i>Not provided</i>}<br />
        <b>🏷️ Industry:</b> {info.industry || <i>Not provided</i>}<br />
        <b>🌍 Location:</b> {info.location || <i>Not provided</i>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>📄 Description:</b><br />
        <span style={{ marginLeft: 12 }}>{info.description || <i>Not provided</i>}</span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>👥 Target Audience:</b><br />
        <ul style={{ marginTop: 4, marginBottom: 0, marginLeft: 24 }}>
          <li><b>Audience:</b> {info.targetAudience || <i>Not provided</i>}</li>
          <li><b>Age Range:</b> {info.audienceAgeRange || <i>Not provided</i>}</li>
          <li><b>Income Level:</b> {info.audienceIncomeLevel || <i>Not provided</i>}</li>
          <li><b>Pain Points:</b> {info.audiencePainPoints || <i>Not provided</i>}</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>🏆 Competitive Analysis:</b><br />
        <ul style={{ marginTop: 4, marginBottom: 0, marginLeft: 24 }}>
          <li><b>Competitors:</b> {info.competitors || <i>Not provided</i>}</li>
          <li><b>Unique Value Proposition:</b> {info.uniqueValueProposition || <i>Not provided</i>}</li>
          <li><b>Key Differentiators:</b> {info.keyDifferentiators || <i>Not provided</i>}</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>🎯 Business Goals:</b><br />
        <ul style={{ marginTop: 4, marginBottom: 0, marginLeft: 24 }}>
          <li><b>Goals:</b> {info.goals || <i>Not provided</i>}</li>
          <li><b>Timeline:</b> {info.timeline || <i>Not provided</i>}</li>
          <li><b>Success Metrics:</b> {info.successMetrics || <i>Not provided</i>}</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>💰 Budget:</b><br />
        <ul style={{ marginTop: 4, marginBottom: 0, marginLeft: 24 }}>
          <li><b>Monthly Budget:</b> {info.budget ? `$${info.budget}` : <i>Not provided</i>}</li>
          <li><b>Budget Allocation:</b> {info.budgetAllocation || <i>Not provided</i>}</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>📢 Current Marketing:</b><br />
        <ul style={{ marginTop: 4, marginBottom: 0, marginLeft: 24 }}>
          <li><b>Channels:</b> {info.currentChannels || <i>Not provided</i>}</li>
          <li><b>Results:</b> {info.currentResults || <i>Not provided</i>}</li>
          <li><b>Challenges:</b> {info.marketingChallenges || <i>Not provided</i>}</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [form, setForm] = useState<BusinessInfo>(initialState);
  const [current, setCurrent] = useState(0);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [strategyStep, setStrategyStep] = useState(0);
  const [strategyHistory, setStrategyHistory] = useState<string[]>([]);
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({});
  const [showSidebars, setShowSidebars] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [autoFilling, setAutoFilling] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [savedForm, setSavedForm] = useState<BusinessInfo | null>(null);
  const [editForm, setEditForm] = useState<BusinessInfo | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, strategyHistory, submitted, strategyStep]);

  // Responsive: hide sidebars on small screens
  useEffect(() => {
    const handleResize = () => {
      setShowSidebars(window.innerWidth > 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const q = questions[current];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.type === 'number' && isNaN(Number(input))) return;
    setForm(f => ({ ...f, [q.key]: input }));
    setHistory(h => [...h, { q: q.prompt, a: input }]);
    setInput('');
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
      setSavedForm({ ...form, [q.key]: input });
    }
  };

  // Debug: Auto-fill current prompt
  const handleDebug = () => {
    const mock = mockAnswers[q.key] ?? 'Test Value';
    setForm(f => ({ ...f, [q.key]: mock }));
    setHistory(h => [...h, { q: q.prompt, a: String(mock) }] );
    setInput('');
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
      setStrategyStep(0);
      setStrategyHistory([]);
    }
  };

  // Debug: Auto-fill all fields one by one with delay
  const handleDebugAll = async () => {
    if (autoFilling) return;
    setAutoFilling(true);
    let tempForm = { ...form };
    let tempHistory = [...history];
    let i = current;
    for (; i < questions.length; i++) {
      const q = questions[i];
      const mock = String(mockAnswers[q.key] ?? 'Test Value');
      tempForm[q.key] = mock;
      tempHistory.push({ q: q.prompt, a: mock });
      setForm({ ...tempForm });
      setHistory([...tempHistory]);
      setInput('');
      setCurrent(i);
      await new Promise(res => setTimeout(res, 350));
    }
    setShowSummary(true);
    setSavedForm({ ...tempForm });
    setAutoFilling(false);
  };

  // Chatbot education flow after form submission
  const handleNextStrategy = () => {
    const section = strategySections[strategyStep];
    setStrategyHistory(h => [...h, section.getText(mockStrategy)]);
    setStrategyStep(s => s + 1);
  };

  // Accordion toggle handler
  const toggleAccordion = (key: string) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to render content for each section in the accordion
  const renderAccordionContent = (sectionKey: string) => {
    switch (sectionKey) {
      case 'marketPositioning':
        return <div>{mockStrategy.marketPositioning}</div>;
      case 'swotAnalysis':
        return (
          <ul>
            <li><b>Strengths:</b> {mockStrategy.swotAnalysis.strengths.join(', ')}</li>
            <li><b>Weaknesses:</b> {mockStrategy.swotAnalysis.weaknesses.join(', ')}</li>
            <li><b>Opportunities:</b> {mockStrategy.swotAnalysis.opportunities.join(', ')}</li>
            <li><b>Threats:</b> {mockStrategy.swotAnalysis.threats.join(', ')}</li>
          </ul>
        );
      case 'audiencePersonas':
        return <ul>{mockStrategy.audiencePersonas.map((p, i) => <li key={i}>{p}</li>)}</ul>;
      case 'customerJourney':
        return <ul>{mockStrategy.customerJourney.map((step, i) => <li key={i}>{step}</li>)}</ul>;
      case 'channelStrategy':
        return (
          <ul>
            {mockStrategy.channelStrategy.map((cs, i) => (
              <li key={i}>{cs.channel}: {cs.goal}, Budget: {cs.budgetAllocation}, KPIs: {cs.kpis.join(', ')}</li>
            ))}
          </ul>
        );
      case 'campaignStructure':
        return (
          <ul>
            {mockStrategy.campaignStructure.map((cs, i) => (
              <li key={i}>{cs.campaignType} targeting {cs.targeting}, Keywords: {cs.keywords.join(', ')}, Ad Copy: {cs.adCopyRecommendations.join('; ')}</li>
            ))}
          </ul>
        );
      case 'budgetBreakdown':
        return (
          <ul>
            {mockStrategy.budgetBreakdown.map((b, i) => (
              <li key={i}>{b.channel}: ${b.amount} ({b.percentage})</li>
            ))}
          </ul>
        );
      case 'timeline':
        return (
          <ul>
            {mockStrategy.timeline.map((t, i) => (
              <li key={i}>{t.phase} ({t.duration}): {t.milestones.join(', ')}</li>
            ))}
          </ul>
        );
      case 'kpis':
        return (
          <ul>
            {mockStrategy.kpis.map((k, i) => (
              <li key={i}>{k.metric}: {k.target} ({k.frequency})</li>
            ))}
          </ul>
        );
      case 'optimizationSchedule':
        return (
          <ul>
            {mockStrategy.optimizationSchedule.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        );
      case 'nextSteps':
        return (
          <ul>
            {mockStrategy.nextSteps.map((n, i) => (
              <li key={i}>{n.step} (Priority: {n.priority}, Timeline: {n.timeline}, Dependencies: {n.dependencies.join(', ')})</li>
            ))}
          </ul>
        );
      case 'risks':
        return (
          <ul>
            {mockStrategy.risks.map((r, i) => (
              <li key={i}>{r.risk} (Impact: {r.impact}, Mitigation: {r.mitigation})</li>
            ))}
          </ul>
        );
      case 'successCriteria':
        return (
          <ul>
            {mockStrategy.successCriteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        );
      default:
        return <span style={{ color: '#555' }}>No actionable next steps for this section.</span>;
    }
  };

  // Continue to strategy
  const handleContinue = () => {
    setShowSummary(false);
    setSubmitted(true);
    setStrategyStep(0);
    setStrategyHistory([]);
  };

  // Enter edit mode
  const handleEditInfo = () => {
    setShowSummary(false);
    setSubmitted(false);
    setEditMode(true);
    if (savedForm) {
      setEditForm({ ...savedForm });
    } else {
      setEditForm({ ...form });
    }
  };

  // Save changes from edit mode
  const handleSaveEdit = () => {
    if (!editForm) return;
    setForm(editForm);
    // Update chat history to match new answers
    const newHistory = questions.map(q => ({ q: q.prompt, a: String(editForm[q.key] ?? '') }));
    setHistory(newHistory);
    setSavedForm(editForm);
    setEditMode(false);
    setShowSummary(true);
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setShowSummary(true);
  };

  // Layout: main chat + debug sidebar + accordion sidebar
  return (
    <div className="ga-root">
      {/* Google Ads style header */}
      <header className="ga-header">
        <span className="ga-logo">G</span>
        <span className="ga-title">Marketing Advisor</span>
      </header>
      {/* Debug toggle button (fixed in corner) */}
      <button
        onClick={() => setShowDebug(v => !v)}
        className="ga-debug-toggle"
        aria-label={showDebug ? 'Hide debug info' : 'Show debug info'}
      >
        {showDebug ? 'Hide Debug' : 'Show Debug'}
      </button>
      <div className="ga-main-layout">
        <main className="ga-chat-main">
          <h1 className="ga-section-title">Business Info Chat</h1>
          {editMode ? (
            <div className="ga-edit-form">
              <h2>Edit Business Information</h2>
              <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }}>
                {questions.map(q => (
                  <div key={q.key} style={{ marginBottom: 14 }}>
                    <label style={{ fontWeight: 500, color: '#174ea6', display: 'block', marginBottom: 4 }}>{q.prompt}</label>
                    {q.type === 'textarea' ? (
                      <textarea
                        value={editForm ? editForm[q.key] : ''}
                        onChange={e => setEditForm(f => f ? { ...f, [q.key]: e.target.value } : f)}
                        rows={2}
                        className="ga-input"
                      />
                    ) : q.type === 'select' ? (
                      <select
                        value={editForm ? editForm[q.key] : ''}
                        onChange={e => setEditForm(f => f ? { ...f, [q.key]: e.target.value } : f)}
                        className="ga-input"
                      >
                        {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : q.type === 'number' ? (
                      <span className="ga-input-group">
                        <span className="ga-input-prefix">$</span>
                        <input
                          type="number"
                          value={editForm ? editForm[q.key] : ''}
                          onChange={e => setEditForm(f => f ? { ...f, [q.key]: e.target.value } : f)}
                          className="ga-input"
                        />
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={editForm ? editForm[q.key] : ''}
                        onChange={e => setEditForm(f => f ? { ...f, [q.key]: e.target.value } : f)}
                        className="ga-input"
                      />
                    )}
                  </div>
                ))}
                <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
                  <button type="submit" className="ga-btn ga-btn-primary">Save Changes</button>
                  <button type="button" className="ga-btn ga-btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </form>
            </div>
          ) : showSummary ? (
            <div className="ga-summary-checkpoint">
              <BusinessInfoSummary info={form} />
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="ga-btn ga-btn-primary" onClick={handleContinue}>Continue to Strategy</button>
                <button className="ga-btn ga-btn-secondary" onClick={handleEditInfo}>Edit Info</button>
              </div>
            </div>
          ) : !submitted ? (
            <>
              <div className="ga-chat-bubbles" >
                {history.map((item, i) => (
                  <div key={i} className="ga-bubble-group">
                    <div className="ga-bubble ga-bubble-advisor">Advisor: {item.q}</div>
                    <div className="ga-bubble ga-bubble-user">You: {item.a}</div>
                  </div>
                ))}
                <div className="ga-bubble ga-bubble-advisor">Advisor: {q.prompt}</div>
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleSubmit} className="ga-chat-form">
                {q.type === 'textarea' ? (
                  <textarea
                    value={input}
                    onChange={handleInput}
                    rows={2}
                    className="ga-input"
                    autoFocus
                  />
                ) : q.type === 'select' ? (
                  <select value={input} onChange={handleInput} className="ga-input" autoFocus>
                    {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : q.type === 'number' ? (
                  <span className="ga-input-group">
                    <span className="ga-input-prefix">$</span>
                    <input
                      type="number"
                      value={input}
                      onChange={handleInput}
                      className="ga-input"
                      autoFocus
                    />
                  </span>
                ) : (
                  <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    className="ga-input"
                    autoFocus
                  />
                )}
                <button type="submit" className="ga-btn ga-btn-primary">Send</button>
                <button type="button" className="ga-btn ga-btn-secondary" onClick={handleDebug} disabled={autoFilling}>Debug: Auto-Fill</button>
                <button type="button" className="ga-btn ga-btn-secondary" onClick={handleDebugAll} disabled={autoFilling}>Debug: Auto-Fill All</button>
              </form>
            </>
          ) : (
            <>
              <div className="ga-chat-bubbles">
                {strategyHistory.map((msg, i) => (
                  <div key={i} className="ga-bubble-group">
                    <div className="ga-bubble ga-bubble-advisor" style={{ whiteSpace: 'pre-line' }}>Advisor: {msg}</div>
                  </div>
                ))}
                {strategyStep < strategySections.length && (
                  <div className="ga-bubble ga-bubble-advisor">Advisor: Ready to learn about {strategySections[strategyStep].label}?</div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                {strategyStep < strategySections.length ? (
                  <button onClick={handleNextStrategy} className="ga-btn ga-btn-primary">Next</button>
                ) : null}
                <button onClick={handleEditInfo} className="ga-btn ga-btn-secondary">Back to Edit Info</button>
              </div>
              {strategyStep >= strategySections.length && (
                <div style={{ marginTop: 16 }}>
                  <b>You've completed the marketing strategy walkthrough!</b>
                  <br />
                  <button onClick={() => { setSubmitted(false); setCurrent(0); setHistory([]); setForm(initialState); setStrategyStep(0); setStrategyHistory([]); setAccordionOpen({}); setShowSummary(false); setEditMode(false); setSavedForm(null); }} className="ga-btn ga-btn-secondary">Start Over</button>
                </div>
              )}
            </>
          )}
        </main>
        {/* Debug sidebar (collapsible, hidden by default) */}
        {showSidebars && showDebug && (
          <aside className="ga-debug-sidebar">
            <h3>Debug: Business Info</h3>
            <pre>{JSON.stringify(editMode && editForm ? editForm : form, null, 2)}</pre>
          </aside>
        )}
        {/* Accordion sidebar (only after strategy starts) */}
        {showSidebars && submitted && (
          <aside className="ga-accordion-sidebar">
            <h3>Strategy Next Steps</h3>
            {strategySections.map(section => (
              <div key={section.key} className="ga-accordion-item">
                <div
                  className="ga-accordion-header"
                  onClick={() => toggleAccordion(section.key)}
                >
                  {section.label}
                </div>
                {accordionOpen[section.key] && (
                  <div className="ga-accordion-content">
                    {renderAccordionContent(section.key)}
                  </div>
                )}
              </div>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}

export default App
