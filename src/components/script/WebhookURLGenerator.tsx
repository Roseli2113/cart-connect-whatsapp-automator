
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Copy, Check, Link2, ExternalLink } from "lucide-react";
import { toast } from "../../../components/ui/use-toast";

const WebhookURLGenerator = () => {
  const [userId, setUserId] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="userId" className="text-sm font-medium">
            ID do Usuário
          </label>
          <div className="flex gap-2">
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Digite o ID do usuário"
              className="flex-1"
            />
            <Button onClick={generateWebhookUrl}>
              Gerar URL
            </Button>
          </div>
        </div>

        {webhookUrl && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">URL do Webhook:</h3>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {isCopied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gray-50 border rounded-md overflow-hidden">
              <Link2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div className="text-sm font-mono overflow-x-auto whitespace-nowrap flex-1">
                {webhookUrl}
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Como configurar no WooCommerce
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700 ml-1">
                  <li>Acesse WooCommerce &gt; Configurações &gt; Webhooks</li>
                  <li>Clique em "Adicionar Webhook"</li>
                  <li>Nome: "Carrinho Abandonado"</li>
                  <li>Status: Ativo</li>
                  <li>Tópico: "Pedido Atualizado" ou "Pedido Criado"</li>
                  <li>URL de Entrega: Cole a URL gerada acima</li>
                  <li>Salve o Webhook</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookURLGenerator;
