import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import TopLeaders from "@/components/TopLeaders";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock leaderboard data for development
const mockLeaderboardData = [
  {
    user: { id: 1, name: "Jane Smith", email: "jane@example.com" },
    score: 950,
    examsCompleted: 12
  },
  {
    user: { id: 2, name: "John Doe", email: "john@example.com" },
    score: 925,
    examsCompleted: 10
  },
  {
    user: { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    score: 890,
    examsCompleted: 9
  },
  {
    user: { id: 4, name: "Bob Martin", email: "bob@example.com" },
    score: 820,
    examsCompleted: 8
  },
  {
    user: { id: 5, name: "Charlie Ross", email: "charlie@example.com" },
    score: 780,
    examsCompleted: 7
  },
  {
    user: { id: 6, name: "Diana Chen", email: "diana@example.com" },
    score: 750,
    examsCompleted: 6
  },
  {
    user: { id: 7, name: "Evan White", email: "evan@example.com" },
    score: 720,
    examsCompleted: 5
  },
  {
    user: { id: 8, name: "Fiona Black", email: "fiona@example.com" },
    score: 690,
    examsCompleted: 5
  },
  {
    user: { id: 9, name: "Greg Peterson", email: "greg@example.com" },
    score: 650,
    examsCompleted: 4
  },
  {
    user: { id: 10, name: "Hannah Lee", email: "hannah@example.com" },
    score: 620,
    examsCompleted: 4
  }
];

const Leaderboard = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    language: "",
    timePeriod: "monthly",
    expertise: ""
  });
  
  // Use mock data for development
  const leaderboard = mockLeaderboardData;
  const isLoading = false;
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };
  
  // Get top 3 leaders
  const topLeaders = leaderboard?.slice(0, 3) || [];
  
  // Get rest of leaderboard starting from position 4
  const restOfLeaderboard = leaderboard?.slice(3) || [];
  
  // Find current user's position
  const userPosition = leaderboard?.findIndex(item => item.user.id === user?.id);
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Leaderboard</h2>
          <p className="text-gray-600">See how you rank against other developers and programmers</p>
        </div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Languages</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                <Select value={filters.timePeriod} onValueChange={(value) => handleFilterChange("timePeriod", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <Select value={filters.region} onValueChange={(value) => handleFilterChange("region", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Global" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Global</SelectItem>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="other">Other Regions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isLoading ? (
          <div className="text-center p-8">Loading leaderboard...</div>
        ) : (
          <>
            {/* Top 3 Leaders */}
            <TopLeaders leaders={topLeaders} />
            
            {/* Leaderboard Table */}
            <Card className="overflow-hidden">
              <LeaderboardTable 
                leaderboardData={restOfLeaderboard} 
                currentUserId={user?.id} 
                startRank={4} // Top 3 are displayed separately
              />
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
