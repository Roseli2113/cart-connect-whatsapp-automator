
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Clipboard, Copy, CheckCircle, Check, LinkIcon } from "lucide-react";
import { toast } from "../../../components/ui/use-toast";

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
    <div className="space-y-6">
      <Card className="border-l-4 border-primary">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <LinkIcon className="mr-2 h-5 w-5 text-primary" />
            Gerador de URL para Webhook
          </CardTitle>
          <CardDescription>
            Gere uma URL única para integrar o WooCommerce com o WhatsApp via webhook.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="userId" className="text-sm font-medium">
              ID do Usuário
            </label>
            <div className="flex space-x-2">
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Digite o ID do usuário"
                className="w-full"
              />
              <Button onClick={generateWebhookUrl}>
                Gerar URL
              </Button>
            </div>
          </div>

          {webhookUrl && (
            <div className="space-y-4">
              <h3 className="font-semibold">URL do Webhook Gerada:</h3>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-muted rounded-md flex-1 break-all border border-gray-200">
                  {webhookUrl}
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard} className="flex-shrink-0">
                  {isCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700">Como configurar no WooCommerce</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                    <li>Acesse WooCommerce {'>'} Configurações {'>'} Webhooks no painel WordPress</li>
                    <li>Clique em "Adicionar Webhook"</li>
                    <li>Nome: "Carrinho Abandonado"</li>
                    <li>Status: Ativo</li>
                    <li>Tópico: "Pedido Atualizado" ou "Pedido Criado"</li>
                    <li>URL de Entrega: Cole a URL gerada acima</li>
                    <li>Salve o Webhook</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 flex items-center">
                    <Check className="h-5 w-5 mr-2" /> 
                    Validando a Instalação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 text-sm">
                    Após instalar o script, volte ao CartConnect e clique em "Validar Integração". 
                    Faça um teste adicionando produtos ao carrinho e iniciando o checkout para 
                    confirmar se os eventos estão sendo registrados corretamente.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookURLGenerator;
