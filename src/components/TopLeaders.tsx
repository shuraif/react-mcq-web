import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@shared/schema";

interface LeaderItem {
  user: User;
  score: number;
  examsCompleted: number;
}

interface TopLeadersProps {
  leaders: LeaderItem[];
}

const TopLeaders = ({ leaders }: TopLeadersProps) => {
  // Create placeholders if we have fewer than 3 leaders
  const placeholders = Array(Math.max(0, 3 - leaders.length)).fill(null);
  const allLeaders = [...leaders, ...placeholders];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const getRandomColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-rose-500",
      "bg-emerald-500"
    ];
    
    // Generate a consistent index based on the username
    const index = name ? name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length : 0;
    return colors[index];
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-center items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
      {/* 2nd Place */}
      <div className="flex flex-col items-center">
        {allLeaders[1] ? (
          <>
            <Avatar className="w-20 h-20 border-4 border-gray-300 mb-2">
              <AvatarFallback className={getRandomColor(allLeaders[1].user.name)}>
                {getInitials(allLeaders[1].user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-lg font-medium">{allLeaders[1].user.name}</div>
            <div className="text-sm text-gray-600 mb-2">{allLeaders[1].score * 10} points</div>
            <div className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-medium">2</div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-gray-300 mb-2 flex items-center justify-center text-gray-400">
              <span className="material-icons">person</span>
            </div>
            <div className="text-lg font-medium text-gray-400">Second Place</div>
            <div className="text-sm text-gray-400 mb-2">-</div>
            <div className="bg-gray-200 text-gray-400 rounded-full w-8 h-8 flex items-center justify-center font-medium">2</div>
          </>
        )}
      </div>
      
      {/* 1st Place */}
      <div className="flex flex-col items-center">
        {allLeaders[0] ? (
          <>
            <Avatar className="w-24 h-24 border-4 border-yellow-400 mb-2">
              <AvatarFallback className={getRandomColor(allLeaders[0].user.name)}>
                {getInitials(allLeaders[0].user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xl font-medium">{allLeaders[0].user.name}</div>
            <div className="text-sm text-gray-600 mb-2">{allLeaders[0].score * 10} points</div>
            <div className="bg-yellow-400 text-yellow-900 rounded-full w-10 h-10 flex items-center justify-center font-medium">1</div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-yellow-200 mb-2 flex items-center justify-center text-gray-400">
              <span className="material-icons text-3xl">emoji_events</span>
            </div>
            <div className="text-xl font-medium text-gray-400">First Place</div>
            <div className="text-sm text-gray-400 mb-2">-</div>
            <div className="bg-yellow-200 text-yellow-700 rounded-full w-10 h-10 flex items-center justify-center font-medium">1</div>
          </>
        )}
      </div>
      
      {/* 3rd Place */}
      <div className="flex flex-col items-center">
        {allLeaders[2] ? (
          <>
            <Avatar className="w-20 h-20 border-4 border-amber-700 mb-2">
              <AvatarFallback className={getRandomColor(allLeaders[2].user.name)}>
                {getInitials(allLeaders[2].user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-lg font-medium">{allLeaders[2].user.name}</div>
            <div className="text-sm text-gray-600 mb-2">{allLeaders[2].score * 10} points</div>
            <div className="bg-amber-700 text-amber-50 rounded-full w-8 h-8 flex items-center justify-center font-medium">3</div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-amber-200 mb-2 flex items-center justify-center text-gray-400">
              <span className="material-icons">person</span>
            </div>
            <div className="text-lg font-medium text-gray-400">Third Place</div>
            <div className="text-sm text-gray-400 mb-2">-</div>
            <div className="bg-amber-200 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center font-medium">3</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopLeaders;
