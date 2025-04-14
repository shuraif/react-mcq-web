import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading) {
      // Redirect to login if not authenticated and not already on auth pages
      if (!isAuthenticated && 
          !location.startsWith("/login") && 
          !location.startsWith("/register") && 
          !location.startsWith("/forgot-password")) {
        navigate("/login");
      }
      
      // Redirect to dashboard if authenticated and on auth pages
      if (isAuthenticated && 
          (location.startsWith("/login") || 
           location.startsWith("/register") || 
           location.startsWith("/forgot-password") ||
           location === "/")) {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-medium text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Header />}
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
      {isAuthenticated && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
