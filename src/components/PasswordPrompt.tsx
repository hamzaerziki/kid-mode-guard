import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface PasswordPromptProps {
  onPasswordVerified: () => void;
  onCancel: () => void;
  correctPassword: string;
  action: string;
}

export const PasswordPrompt = ({ onPasswordVerified, onCancel, correctPassword, action }: PasswordPromptProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      onPasswordVerified();
      toast({
        title: "Access granted",
        description: `Successfully ${action}`,
      });
    } else {
      setAttempts(prev => prev + 1);
      setPassword("");
      toast({
        title: "Incorrect password",
        description: `Please try again. Attempts: ${attempts + 1}`,
        variant: "destructive",
      });
      
      if (attempts >= 2) {
        setTimeout(() => {
          onCancel();
          setAttempts(0);
        }, 2000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-gradient-card border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-parentControl">{t("password.prompt")}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("password.promptDescription")}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-parentControl">
                {t("password.enterPassword")}
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password.enterPassword")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/20 focus:border-primary pr-10"
                  autoFocus
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {attempts > 0 && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">
                  ⚠️ Incorrect password. {3 - attempts} attempts remaining.
                  {attempts >= 2 && " Auto-closing in 2 seconds..."}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                {t("common.cancel")}
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-primary hover:shadow-button"
                disabled={attempts >= 3}
              >
                <Shield className="mr-2 h-4 w-4" />
                {t("password.unlock")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};