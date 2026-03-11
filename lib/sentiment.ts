const POSITIVE = [
  'great', 'love', 'amazing', 'excellent', 'awesome', 'good', 'best', 
  'perfect', 'wonderful', 'fantastic', 'happy', 'congratulations', 'well done'
];

const NEGATIVE = [
  'bad', 'worst', 'terrible', 'awful', 'hate', 'poor', 'horrible', 
  'disappointing', 'wrong', 'failed', 'useless', 'scam', 'fraud', 'sad'
];

export function classifySentiment(text: string): 'positive' | 'neutral' | 'negative' {
  if (!text) return 'neutral';
  
  const lower = text.toLowerCase();
  const posScore = POSITIVE.filter(w => lower.includes(w)).length;
  const negScore = NEGATIVE.filter(w => lower.includes(w)).length;
  
  if (posScore > negScore) return 'positive';
  if (negScore > posScore) return 'negative';
  return 'neutral';
}
