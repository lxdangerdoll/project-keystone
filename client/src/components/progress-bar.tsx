interface ProgressBarProps {
  progress: {
    currentChapter: number;
    totalChoices: number;
  };
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const progressPercentage = Math.min((progress.currentChapter / 12) * 100, 100);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-purple-300">Story Progress</span>
        <span className="text-sm text-gray-400">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="progress-bar h-2 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Chapter {progress.currentChapter}</span>
        <span>{progress.totalChoices} choices made</span>
      </div>
    </div>
  );
}
