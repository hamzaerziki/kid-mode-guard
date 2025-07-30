import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { PasswordPrompt } from "@/components/PasswordPrompt";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, Bell, Eye, EyeOff, Smartphone, Info, Globe, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface SettingsPageProps {
  password: string;
  onPasswordChange: (newPassword: string) => void;
}

export const SettingsPage = ({ password, onPasswordChange }: SettingsPageProps) => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleChangePassword = () => {
    setPendingAction("change password");
    setShowPasswordPrompt(true);
  };

  const handlePasswordVerified = () => {
    setShowPasswordPrompt(false);
    setPendingAction("");
    
    if (pendingAction === "change password") {
      toast({
        title: t("password.success"),
        description: t("password.promptDescription"),
      });
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPendingAction("");
  };

  const handleSaveNewPassword = () => {
    if (newPassword.length < 6) {
      toast({
        title: t("password.passwordRequired"),
        description: t("password.minLength"),
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: t("password.passwordsDontMatch"),
        description: t("password.passwordsDontMatch"),
        variant: "destructive",
      });
      return;
    }

    onPasswordChange(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    toast({
      title: t("password.success"),
      description: t("password.success"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-parentControl mb-2">{t("settings.title")}</h1>
          <p className="text-muted-foreground">{t("settings.passwordManagement")}</p>
        </div>

        {/* Language Settings */}
        <Card className="bg-gradient-card border-primary/10 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              {t("settings.language")}
            </CardTitle>
            <CardDescription>
              {t("settings.languageDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher />
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="bg-gradient-card border-primary/10 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl flex items-center">
              <Monitor className="mr-2 h-5 w-5 text-primary" />
              {t("settings.theme.title")}
            </CardTitle>
            <CardDescription>
              {t("settings.theme.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gradient-card border-primary/10 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              {t("settings.passwordManagement")}
            </CardTitle>
            <CardDescription>
              {t("settings.changePasswordDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleChangePassword}
              variant="outline"
              className="w-full justify-start hover:border-primary/50"
            >
              <Settings className="mr-2 h-4 w-4" />
              {t("settings.changePassword")}
            </Button>

            {(pendingAction === "change password" && !showPasswordPrompt) && (
              <div className="space-y-4 p-4 bg-accent rounded-lg">
                <h3 className="font-medium text-parentControl">{t("password.enterPassword")}</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-parentControl">
                    {t("password.enterPassword")}
                  </label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder={t("password.enterPassword")}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border-primary/20 focus:border-primary pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
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

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPendingAction("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="flex-1"
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button
                    onClick={handleSaveNewPassword}
                    className="flex-1 bg-gradient-primary"
                  >
                    {t("common.save")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="bg-gradient-card border-primary/10 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl flex items-center">
              <Smartphone className="mr-2 h-5 w-5 text-primary" />
              {t("settings.title")}
            </CardTitle>
            <CardDescription>
              {t("settings.languageDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-parentControl">Notifications</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get alerts when Kid Mode changes
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-gradient-secondary/10 border-secondary/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl flex items-center">
              <Info className="mr-2 h-5 w-5 text-secondary" />
              {t("navbar.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Purpose:</strong> Help parents manage their child's internet access through simple, secure controls.</p>
              <p><strong>Note:</strong> This app provides interface controls. Actual network restriction depends on your device's parental control settings.</p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Reset */}
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <h3 className="font-medium text-destructive">{t("settings.resetData")}</h3>
              <p className="text-sm text-muted-foreground">
                If you forget your password, you'll need to reinstall the app
              </p>
              <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPasswordPrompt && (
        <PasswordPrompt
          onPasswordVerified={handlePasswordVerified}
          onCancel={handlePasswordCancel}
          correctPassword={password}
          action={pendingAction}
        />
      )}
    </div>
  );
};