import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@shared/schema";

interface LeaderboardItem {
  user: User;
  score: number;
  examsCompleted: number;
}

interface LeaderboardTableProps {
  leaderboardData: LeaderboardItem[];
  currentUserId: number | undefined;
  startRank: number;
}

const LeaderboardTable = ({ leaderboardData, currentUserId, startRank }: LeaderboardTableProps) => {
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
    const index = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600">Rank</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Languages</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Exams Completed</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Avg. Score</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((item, index) => {
              const isCurrentUser = item.user.id === currentUserId;
              const rank = startRank + index;
              
              return (
                <tr 
                  key={item.user.id} 
                  className={`border-b border-gray-200 ${isCurrentUser ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}`}
                >
                  <td className="py-3 px-4 font-medium">{rank}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarFallback className={getRandomColor(item.user.name)}>
                          {getInitials(item.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={isCurrentUser ? "font-medium" : ""}>
                        {item.user.name} {isCurrentUser && "(You)"}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">Spanish, French</td>
                  <td className="py-3 px-4">{item.examsCompleted}</td>
                  <td className="py-3 px-4">{item.score}%</td>
                  <td className="py-3 px-4 font-medium">{item.score * 10}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                No leaderboard data available. Complete exams to appear on the leaderboard.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
