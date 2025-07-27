import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PasswordSetup } from "@/components/PasswordSetup";
import { Dashboard } from "@/pages/Dashboard";
import { TimerPage } from "@/pages/TimerPage";
import { SettingsPage } from "@/pages/SettingsPage";

const Index = () => {
  const [password, setPassword] = useState<string | null>(null);
  const [kidModeActive, setKidModeActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const savedPassword = localStorage.getItem("parentalPassword");
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handlePasswordSet = (newPassword: string) => {
    setPassword(newPassword);
    localStorage.setItem("parentalPassword", newPassword);
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    localStorage.setItem("parentalPassword", newPassword);
  };

  const handleKidModeChange = (active: boolean, timeRemainingSeconds?: number) => {
    setKidModeActive(active);
    if (timeRemainingSeconds) {
      setTimeRemaining(timeRemainingSeconds);
    }
  };

  if (!password) {
    return <PasswordSetup onPasswordSet={handlePasswordSet} />;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Dashboard password={password} />} 
      />
      <Route 
        path="/timer" 
        element={
          <TimerPage 
            password={password} 
            kidModeActive={kidModeActive}
            onKidModeChange={handleKidModeChange}
          />
        } 
      />
      <Route 
        path="/settings" 
        element={
          <SettingsPage 
            password={password} 
            onPasswordChange={handlePasswordChange}
          />
        } 
      />
    </Routes>
  );
};

export default Index;
