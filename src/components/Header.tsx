import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, User, LogOut, LayoutDashboard, BookOpen, Trophy } from "lucide-react";

const Header = () => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Update active tab based on current location
  useEffect(() => {
    if (location.startsWith("/dashboard")) {
      setActiveTab("dashboard");
    } else if (location.startsWith("/exams")) {
      setActiveTab("exams");
    } else if (location.startsWith("/leaderboard")) {
      setActiveTab("leaderboard");
    } else if (location.startsWith("/profile")) {
      setActiveTab("profile");
    }
  }, [location]);
  
  const handleTabClick = (tab: string) => {
    navigate(`/${tab}`);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <GraduationCap className="mr-2" />
            <h1 className="text-xl font-medium">CodeQuiz</h1>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-4">
              <User className="w-4 h-4 mr-1" />
              <span>{user?.name || "Test User"}</span>
            </div>
            <button 
              className="flex items-center px-3 py-1 hover:bg-primary-dark rounded-full" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex space-x-6">
          <button 
            className={`py-4 flex items-center text-white ${activeTab === "dashboard" ? "font-medium border-b-2 border-white" : "opacity-80"} hover:opacity-100`}
            onClick={() => handleTabClick("dashboard")}
          >
            <LayoutDashboard className="w-4 h-4 mr-1" />
            <span>Dashboard</span>
          </button>
          <button 
            className={`py-4 flex items-center text-white ${activeTab === "exams" ? "font-medium border-b-2 border-white" : "opacity-80"} hover:opacity-100`}
            onClick={() => handleTabClick("exams")}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            <span>Exams</span>
          </button>
          <button 
            className={`py-4 flex items-center text-white ${activeTab === "leaderboard" ? "font-medium border-b-2 border-white" : "opacity-80"} hover:opacity-100`}
            onClick={() => handleTabClick("leaderboard")}
          >
            <Trophy className="w-4 h-4 mr-1" />
            <span>Leaderboard</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
