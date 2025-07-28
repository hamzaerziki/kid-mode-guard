import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface PasswordSetupProps {
  onPasswordSet: (password: string) => void;
}

export const PasswordSetup = ({ onPasswordSet }: PasswordSetupProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        title: t("password.passwordRequired"),
        description: t("password.minLength"),
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t("password.passwordsDontMatch"),
        description: t("password.passwordsDontMatch"),
        variant: "destructive",
      });
      return;
    }

    onPasswordSet(password);
    toast({
      title: t("password.success"),
      description: t("password.success"),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-0 shadow-card">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-parentControl">{t("navbar.title")}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("password.setupDescription")}
          </CardDescription>
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-parentControl">
                {t("password.confirmPassword")}
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("password.confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-primary/20 focus:border-primary pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-button transition-all duration-300"
            >
              <Shield className="mr-2 h-4 w-4" />
              {t("password.create")}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-accent rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              💡 <strong>Tip:</strong> Choose a password your child won't guess, but one you'll remember easily.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};