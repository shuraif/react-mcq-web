import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Exams from "@/pages/Exams";
import Leaderboard from "@/pages/Leaderboard";
import ExamScreen from "@/pages/ExamScreen";
import ResultsScreen from "@/pages/ResultsScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

function App() {
  const [location, navigate] = useLocation();

  useEffect(() => {
    // Always redirect to login if at root
    if (location === "/") {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always show Header except on login/register/forgot-password pages */}
      {!location.startsWith("/login") && 
       !location.startsWith("/register") && 
       !location.startsWith("/forgot-password") && <Header />}

      <main className="flex-grow bg-gray-100">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/exams" component={Exams} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/exam/:id" component={ExamScreen} />
          <Route path="/results/:attemptId" component={ResultsScreen} />
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* Always show Footer except on login/register/forgot-password pages */}
      {!location.startsWith("/login") && 
       !location.startsWith("/register") && 
       !location.startsWith("/forgot-password") && <Footer />}

      <Toaster />
    </div>
  );
}

export default App;