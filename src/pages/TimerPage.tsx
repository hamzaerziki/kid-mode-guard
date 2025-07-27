import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { TimerControls } from "@/components/TimerControls";
import { PasswordPrompt } from "@/components/PasswordPrompt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimerPageProps {
  password: string;
  kidModeActive: boolean;
  onKidModeChange: (active: boolean, timeRemaining?: number) => void;
}

export const TimerPage = ({ password, kidModeActive, onKidModeChange }: TimerPageProps) => {
  const [selectedTime, setSelectedTime] = useState(30);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [pendingTimer, setPendingTimer] = useState(0);
  const { toast } = useToast();

  const handleStartTimer = () => {
    setPendingTimer(selectedTime);
    setShowPasswordPrompt(true);
  };

  const handlePasswordVerified = () => {
    onKidModeChange(true, pendingTimer * 60);
    setShowPasswordPrompt(false);
    setPendingTimer(0);
    toast({
      title: "Timer Started",
      description: `Kid Mode activated for ${pendingTimer} minutes`,
    });
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPendingTimer(0);
  };

  // Mock data for demonstration
  const todayUsage = 45; // minutes
  const weeklyAverage = 52; // minutes per day
  const dailyLimit = 120; // minutes

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-parentControl mb-2">Timer Management</h1>
          <p className="text-muted-foreground">Set custom time limits for internet access</p>
        </div>

        {/* Timer Controls */}
        <TimerControls
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
          onStartTimer={handleStartTimer}
          isKidModeActive={kidModeActive}
        />

        {/* Usage Statistics */}
        <Card className="bg-gradient-card border-primary/10 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Usage Statistics
            </CardTitle>
            <CardDescription>
              Track your child's internet time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Today's Usage</span>
                </div>
                <span className="font-semibold text-parentControl">{todayUsage}min</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Weekly Average</span>
                </div>
                <span className="font-semibold text-parentControl">{weeklyAverage}min/day</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Daily Limit</span>
                </div>
                <span className="font-semibold text-parentControl">{dailyLimit}min</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress Today</span>
                <span className="text-parentControl font-medium">
                  {Math.round((todayUsage / dailyLimit) * 100)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((todayUsage / dailyLimit) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {dailyLimit - todayUsage}min remaining today
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">7</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Goals Met</div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="bg-gradient-secondary/10 border-secondary/30">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-parentControl mb-1">Timer Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Start with shorter periods and gradually adjust based on your child's needs and behavior.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPasswordPrompt && (
        <PasswordPrompt
          onPasswordVerified={handlePasswordVerified}
          onCancel={handlePasswordCancel}
          correctPassword={password}
          action={`start ${pendingTimer} minute timer`}
        />
      )}
    </div>
  );
};