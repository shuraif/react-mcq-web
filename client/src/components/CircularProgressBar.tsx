interface CircularProgressBarProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  label?: string;
  sublabel?: string;
}

const CircularProgressBar = ({ 
  percentage, 
  size, 
  strokeWidth, 
  color,
  label,
  sublabel
}: CircularProgressBarProps) => {
  // Calculate the dimensions
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = radius * 2 * Math.PI;
  const dashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg className="transform -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle 
        className="text-gray-200" 
        strokeWidth={strokeWidth} 
        stroke="currentColor" 
        fill="transparent" 
        r={radius} 
        cx={size/2} 
        cy={size/2} 
      />
      
      {/* Progress circle */}
      <circle 
        className={`${color} transition-all duration-300 ease-in-out`}
        strokeWidth={strokeWidth} 
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        strokeLinecap="round"
        stroke="currentColor" 
        fill="transparent" 
        r={radius} 
        cx={size/2} 
        cy={size/2} 
      />
      
      {/* Text in the middle */}
      {label && (
        <text 
          x="50%" 
          y={sublabel ? "45%" : "50%"}
          textAnchor="middle" 
          fill="#212121" 
          fontSize={size/5}
          dy=".1em"
          fontWeight="500"
          className="transform rotate-90"
        >
          {label}
        </text>
      )}
      
      {/* Sublabel in the middle */}
      {sublabel && (
        <text 
          x="50%" 
          y="60%" 
          textAnchor="middle" 
          fill="#616161" 
          fontSize={size/10}
          className="transform rotate-90"
        >
          {sublabel}
        </text>
      )}
    </svg>
  );
};

export default CircularProgressBar;
