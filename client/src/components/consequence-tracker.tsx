interface ConsequenceTrackerProps {
  progress: {
    trustNetwork: number;
    councilStanding: number;
    crewLoyalty: number;
  };
}

export default function ConsequenceTracker({ progress }: ConsequenceTrackerProps) {
  const getValueDisplay = (value: number) => {
    return value > 0 ? `+${value}` : value.toString();
  };

  const getValueColor = (value: number) => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="glassmorphism consequence-pulse rounded-xl p-6 mb-6 border border-purple-500/30">
      <div className="flex items-center mb-4">
        <i className="fas fa-dna text-purple-400 mr-3 text-xl"></i>
        <h3 className="font-orbitron text-lg font-bold text-purple-300">NARRATIVE STRAND ANALYSIS</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getValueColor(progress.trustNetwork)}`}>
            {getValueDisplay(progress.trustNetwork)}
          </div>
          <div className="text-sm text-green-300">Trust Network</div>
          <div className="text-xs text-gray-400 mt-1">Your honest approach is building allies</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getValueColor(progress.councilStanding)}`}>
            {getValueDisplay(progress.councilStanding)}
          </div>
          <div className="text-sm text-red-300">Council Standing</div>
          <div className="text-xs text-gray-400 mt-1">Official authorities are growing suspicious</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getValueColor(progress.crewLoyalty)}`}>
            {getValueDisplay(progress.crewLoyalty)}
          </div>
          <div className="text-sm text-blue-300">Crew Loyalty</div>
          <div className="text-xs text-gray-400 mt-1">Your decisions inspire confidence</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-600/30">
        <div className="text-xs text-gray-400">
          <i className="fas fa-info-circle mr-1"></i>
          Your choices are creating ripple effects across{" "}
          <span className="text-purple-300">3 star systems</span> and influencing{" "}
          <span className="text-purple-300">12 key characters</span>
        </div>
      </div>
    </div>
  );
}
