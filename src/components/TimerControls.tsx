import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerControlsProps {
  selectedTime: number;
  onTimeChange: (minutes: number) => void;
  onStartTimer: () => void;
  isKidModeActive: boolean;
  disabled?: boolean;
}

const PRESET_TIMES = [15, 30, 60, 120];

export const TimerControls = ({ 
  selectedTime, 
  onTimeChange, 
  onStartTimer, 
  isKidModeActive,
  disabled 
}: TimerControlsProps) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const adjustTime = (increment: number) => {
    const newTime = Math.max(5, selectedTime + increment);
    onTimeChange(newTime);
  };

  return (
    <Card className="bg-gradient-card border-primary/10 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-parentControl flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Timer Controls
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Preset Time Buttons */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Quick Select</p>
          <div className="grid grid-cols-2 gap-3">
            {PRESET_TIMES.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => onTimeChange(time)}
                disabled={disabled}
                className={cn(
                  "transition-all duration-200",
                  selectedTime === time 
                    ? "bg-gradient-primary shadow-button" 
                    : "hover:border-primary/50"
                )}
              >
                {formatTime(time)}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Time Adjuster */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Custom Time</p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTime(-5)}
              disabled={disabled || selectedTime <= 5}
              className="hover:border-primary/50"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="px-6 py-3 bg-accent rounded-lg min-w-24 text-center">
              <span className="text-lg font-semibold text-parentControl">
                {formatTime(selectedTime)}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustTime(5)}
              disabled={disabled}
              className="hover:border-primary/50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Start Timer Button */}
        <Button
          onClick={onStartTimer}
          disabled={disabled || isKidModeActive}
          className={cn(
            "w-full h-12 text-base font-semibold transition-all duration-300",
            isKidModeActive 
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-gradient-secondary hover:shadow-button"
          )}
        >
          <Clock className="mr-2 h-5 w-5" />
          {isKidModeActive ? "Timer Running" : `Start ${formatTime(selectedTime)} Timer`}
        </Button>

        {isKidModeActive && (
          <div className="text-center p-3 bg-kidMode-active/5 rounded-lg">
            <p className="text-sm text-kidMode-active font-medium">
              Timer is active - Kid Mode will auto-disable when time expires
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};