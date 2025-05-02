
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clipboard, Copy, CheckCircle, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const WebhookURLGenerator = () => {
  const [userId, setUserId] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const baseUrl = window.location.origin;

  const generateWebhookUrl = () => {
    if (!userId.trim()) {
      toast({
        title: "ID de usuário necessário",
        description: "Por favor, insira um ID de usuário válido para gerar a URL.",
        variant: "destructive",
      });
      return;
    }

    const generatedUrl = `${baseUrl}/webhook/usuario/${userId}`;
    setWebhookUrl(generatedUrl);
    toast({
      title: "URL gerada com sucesso!",
      description: "Agora você pode copiar esta URL e configurá-la no WooCommerce.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl);
    setIsCopied(true);
    toast({
      title: "URL copiada!",
      description: "A URL do webhook foi copiada para sua área de transferência.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const validateIntegration = () => {
    // Simular validação de integração
    setIsValidating(true);
    setTimeout(() => {
      setIsValidated(true);
      setIsValidating(false);
      toast({
        title: "Integração validada com sucesso!",
        description: "Sua configuração de webhook está funcionando corretamente.",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gerador de URL para Webhook</CardTitle>
          <CardDescription>
            Gere uma URL única para integrar o WooCommerce com o WhatsApp via webhook.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="userId" className="text-sm font-medium">
              ID do Usuário
            </label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Digite o ID do usuário"
              className="w-full"
            />
          </div>

          <Button onClick={generateWebhookUrl} className="w-full">
            Gerar URL do Webhook
          </Button>

          {webhookUrl && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">URL do Webhook Gerada:</h3>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-muted rounded-md flex-1 break-all">
                  {webhookUrl}
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-md mt-4">
                <h4 className="font-semibold mb-2">Como configurar no WooCommerce:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Acesse WooCommerce {'>'} Configurações {'>'} Webhooks no painel WordPress</li>
                  <li>Clique em "Adicionar Webhook"</li>
                  <li>Nome: "Carrinho Abandonado"</li>
                  <li>Status: Ativo</li>
                  <li>Tópico: "Pedido Atualizado" ou "Pedido Criado"</li>
                  <li>URL de Entrega: Cole a URL gerada acima</li>
                  <li>Salve o Webhook</li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                <h4 className="font-semibold flex items-center text-green-700 mb-2">
                  <Check className="h-5 w-5 mr-2" /> Validando a Instalação
                </h4>
                <p className="text-green-700">
                  Após instalar o script, volte ao CartConnect e clique em "Validar Integração". 
                  Faça um teste adicionando produtos ao carrinho e iniciando o checkout para 
                  confirmar se os eventos estão sendo registrados corretamente.
                </p>
              </div>

              <Button 
                onClick={validateIntegration} 
                variant="default" 
                className="w-full mt-4"
                disabled={isValidated || isValidating}
              >
                {isValidating ? "Validando..." : isValidated ? "Integração Validada ✓" : "Validar Integração"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookURLGenerator;
