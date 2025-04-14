interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  // Ensure progress is within valid range
  const validProgress = Math.min(100, Math.max(0, progress));
  
  // Color logic
  let bgColor = "bg-primary";
  if (validProgress >= 90) {
    bgColor = "bg-green-500";
  } else if (validProgress >= 50) {
    bgColor = "bg-primary";
  } else if (validProgress >= 25) {
    bgColor = "bg-orange-500";
  } else {
    bgColor = "bg-red-500";
  }
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`${bgColor} rounded-full h-2.5 transition-all duration-300 ease-out`} 
        style={{ width: `${validProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
