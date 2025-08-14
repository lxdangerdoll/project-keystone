interface Choice {
  id: string;
  optionLetter: string;
  title: string;
  description: string;
  riskLevel: string;
  impact: string;
  unlocks: string;
  voteCount: number;
  percentage: number;
}

interface ChoiceSystemProps {
  choices: Choice[];
  selectedChoice: string | null;
  onChoiceSelect: (choiceId: string) => void;
  isSubmitting: boolean;
}

export default function ChoiceSystem({ 
  choices, 
  selectedChoice, 
  onChoiceSelect, 
  isSubmitting 
}: ChoiceSystemProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getLetterColor = (letter: string) => {
    switch (letter) {
      case 'A': return 'bg-blue-600';
      case 'B': return 'bg-purple-600';
      case 'C': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <h3 className="font-orbitron text-xl font-bold text-indigo-300 mb-4">
        <i className="fas fa-route mr-2"></i>
        YOUR CHOICE SHAPES THE NARRATIVE
      </h3>
      
      <div className="grid gap-4">
        {choices.map((choice) => (
          <div 
            key={choice.id}
            className={`glassmorphism choice-hover rounded-xl p-6 cursor-pointer border transition-all duration-300 ${
              selectedChoice === choice.id 
                ? 'border-purple-500 bg-purple-600/10' 
                : 'border-gray-600/30'
            } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => onChoiceSelect(choice.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${getLetterColor(choice.optionLetter)} flex items-center justify-center text-sm font-bold mr-3`}>
                  {choice.optionLetter}
                </div>
                <h4 className="font-bold text-blue-300">{choice.title}</h4>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <i className="fas fa-users mr-1"></i>
                <span>{choice.percentage}%</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {choice.description}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex space-x-4">
                <span className={getRiskColor(choice.riskLevel)}>
                  <i className={`fas ${choice.riskLevel === 'high' ? 'fa-exclamation-triangle' : 
                    choice.riskLevel === 'medium' ? 'fa-balance-scale' : 'fa-shield-alt'} mr-1`}></i>
                  {choice.riskLevel.charAt(0).toUpperCase() + choice.riskLevel.slice(1)} Risk
                </span>
                <span className="text-blue-400">
                  <i className="fas fa-globe mr-1"></i>
                  {choice.impact}
                </span>
              </div>
              <div className="text-indigo-400">
                <i className="fas fa-bolt mr-1"></i>
                Unlocks: {choice.unlocks}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Influence */}
      <div className="glassmorphism-light rounded-lg p-4 mt-6 border border-yellow-500/20">
        <div className="flex items-center mb-2">
          <i className="fas fa-network-wired text-yellow-400 mr-2"></i>
          <h4 className="font-bold text-yellow-400">PORTER NETWORK INFLUENCE</h4>
        </div>
        <div className="text-sm text-gray-300">
          <p className="mb-2">
            The collective choices of <strong>2,847 Porters</strong> will influence this story's direction.
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <span>⏰ <strong>4 hours 23 minutes</strong> remaining to vote</span>
            <span>🔥 <strong>89%</strong> participation rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
