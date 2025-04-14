interface LanguageProgressProps {
  data: {
    language: string;
    level: string;
    progress: number;
    vocabulary: number;
    grammar: number;
    comprehension: number;
  };
}

const LanguageProgress = ({ data }: LanguageProgressProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">{data.language}</h4>
        <span className="text-sm text-gray-600">{data.level}</span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-sm font-medium">{data.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2" 
            style={{ width: `${data.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <div className="flex justify-between mb-2">
          <span>Vocabulary</span>
          <span className="font-medium">{data.vocabulary}%</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Grammar</span>
          <span className="font-medium">{data.grammar}%</span>
        </div>
        <div className="flex justify-between">
          <span>Comprehension</span>
          <span className="font-medium">{data.comprehension}%</span>
        </div>
      </div>
    </div>
  );
};

export default LanguageProgress;
