
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";

type AuthMode = "login" | "register";

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === "login") {
        // Handle login logic here
        console.log("Logging in:", { email, password });
        toast({
          title: "Bem-vindo de volta!",
          description: "Login realizado com sucesso.",
        });
        
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        // Handle registration logic here
        console.log("Registering:", { name, email, password });
        toast({
          title: "Conta criada!",
          description: "Seu registro foi concluído com sucesso.",
        });
        
        // Switch to login mode
        setMode("login");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Ocorreu um erro. Por favor tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-whatsapp flex items-center justify-center">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">
          {mode === "login" ? "Acessar sua conta" : "Criar uma conta"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login"
            ? "Digite seu e-mail e senha para acessar"
            : "Preencha os dados abaixo para se registrar"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              {mode === "login" && (
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Redefinição de senha",
                      description: "Um e-mail foi enviado com instruções para redefinir sua senha.",
                    });
                  }}
                >
                  Esqueceu?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder={mode === "login" ? "Digite sua senha" : "Crie uma senha forte"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-whatsapp hover:bg-whatsapp-dark" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : mode === "login" ? (
              "Entrar"
            ) : (
              "Criar conta"
            )}
          </Button>
          <p className="text-center text-sm">
            {mode === "login" ? "Novo por aqui? " : "Já possui uma conta? "}
            <button
              type="button"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
              onClick={toggleMode}
            >
              {mode === "login" ? "Criar uma conta" : "Fazer login"}
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
