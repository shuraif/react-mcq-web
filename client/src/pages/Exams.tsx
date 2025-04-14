import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ExamCard from "@/components/ExamCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Exams = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    skill: "",
    duration: ""
  });
  
  const { data: exams, isLoading } = useQuery({
    queryKey: ["/api/exams"],
  });
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };
  
  // Apply filters to exams
  const filteredExams = exams?.filter(exam => {
    if (filters.language && exam.language !== filters.language) return false;
    if (filters.level && exam.level !== filters.level) return false;
    
    // Filter by duration range
    if (filters.duration) {
      if (filters.duration === "short" && exam.timeLimit > 10) return false;
      if (filters.duration === "medium" && (exam.timeLimit <= 10 || exam.timeLimit > 20)) return false;
      if (filters.duration === "long" && exam.timeLimit <= 20) return false;
    }
    
    return true;
  }) || [];
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Available Exams</h2>
          <p className="text-gray-600">Choose an exam to test your language skills</p>
        </div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Languages</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner (A1-A2)</SelectItem>
                    <SelectItem value="Intermediate">Intermediate (B1-B2)</SelectItem>
                    <SelectItem value="Advanced">Advanced (C1-C2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                <Select value={filters.skill} onValueChange={(value) => handleFilterChange("skill", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Skills</SelectItem>
                    <SelectItem value="vocabulary">Vocabulary</SelectItem>
                    <SelectItem value="grammar">Grammar</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="listening">Listening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Durations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Durations</SelectItem>
                    <SelectItem value="short">Short (5-10 min)</SelectItem>
                    <SelectItem value="medium">Medium (10-20 min)</SelectItem>
                    <SelectItem value="long">Long (20+ min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Exam Cards */}
        {isLoading ? (
          <div className="text-center p-8">Loading exams...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam, index) => (
                <ExamCard 
                  key={exam.id} 
                  exam={exam} 
                  iconIndex={index % 3} // To cycle through different icons
                />
              ))
            ) : (
              <div className="col-span-3 text-center p-10">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No exams found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more exams</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;
