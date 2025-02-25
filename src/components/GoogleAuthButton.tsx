
import { Button } from "@/components/ui/button";
import { GoogleAuthService } from "@/services/googleAuthService";
import { useToast } from "@/components/ui/use-toast";

export const GoogleAuthButton = () => {
  const { toast } = useToast();

  const handleAuth = () => {
    if (GoogleAuthService.isAuthenticated()) {
      GoogleAuthService.logout();
      toast({
        title: "Desconectado",
        description: "Você foi desconectado da sua conta Google",
      });
      window.location.reload();
    } else {
      window.location.href = GoogleAuthService.getAuthUrl();
    }
  };

  return (
    <Button
      onClick={handleAuth}
      variant="outline"
      className="w-full"
    >
      {GoogleAuthService.isAuthenticated() ? "Desconectar do Google" : "Conectar com Google"}
    </Button>
  );
};
