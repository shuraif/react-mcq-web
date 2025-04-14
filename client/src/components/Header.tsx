import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Track tab indicator position
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0px",
    width: "88px"
  });
  
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
  
  // Update tab indicator position when active tab changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = document.querySelector(`button[data-tab="${activeTab}"]`);
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        setIndicatorStyle({
          left: `${activeButton.offsetLeft}px`,
          width: `${rect.width}px`
        });
      }
    };
    
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);
  
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
            <span className="material-icons mr-2">school</span>
            <h1 className="text-xl font-medium">LinguaExam</h1>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-4">
              <span className="material-icons mr-1">person</span>
              <span>{user?.name || "User"}</span>
            </div>
            <button 
              className="flex items-center px-3 py-1 hover:bg-primary-dark rounded-full" 
              onClick={handleLogout}
            >
              <span className="material-icons text-sm mr-1">logout</span>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="relative flex space-x-8">
          <button 
            className={`py-4 text-white ${activeTab === "dashboard" ? "opacity-90 font-medium" : "opacity-70"} hover:opacity-100 relative`}
            onClick={() => handleTabClick("dashboard")}
            data-tab="dashboard"
          >
            Dashboard
            {activeTab === "dashboard" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>}
          </button>
          <button 
            className={`py-4 text-white ${activeTab === "exams" ? "opacity-90 font-medium" : "opacity-70"} hover:opacity-100`}
            onClick={() => handleTabClick("exams")}
            data-tab="exams"
          >
            Exams
            {activeTab === "exams" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>}
          </button>
          <button 
            className={`py-4 text-white ${activeTab === "leaderboard" ? "opacity-90 font-medium" : "opacity-70"} hover:opacity-100`}
            onClick={() => handleTabClick("leaderboard")}
            data-tab="leaderboard"
          >
            Leaderboard
            {activeTab === "leaderboard" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>}
          </button>
          <div 
            className="absolute bottom-0 h-0.5 bg-white transition-all duration-300" 
            style={indicatorStyle}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
