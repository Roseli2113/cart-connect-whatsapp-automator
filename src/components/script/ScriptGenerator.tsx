
import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Copy, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScriptGenerator = () => {
  const [copied, setCopied] = useState(false);
  
  // Demo script content with user token
  const userToken = "usr_" + Math.random().toString(36).substring(2, 15);
  
  const generatedScript = `
// CartConnect WhatsApp Automation Script
// Generated uniquely for you - User Token: ${userToken}

// Add this to your WordPress site's header or use any script injection plugin
(function() {
  // Configuração
  const cartConnectConfig = {
    token: "${userToken}",
    endpoint: "https://api.cartconnect.io/track",
    cookieExpiry: 7 // dias
  };

  // Tracking Helper
  function trackCartEvent(eventType, cartData) {
    const payload = {
      eventType,
      token: cartConnectConfig.token,
      cartData,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    // Send data to CartConnect
    fetch(cartConnectConfig.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).catch(console.error);
  }

  // WooCommerce integration hooks
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function($) {
      // Track checkout form inputs (email, phone, etc)
      $(document.body).on('change', 'form.checkout input#billing_email, form.checkout input#billing_phone', function() {
        const email = $('input#billing_email').val();
        const phone = $('input#billing_phone').val();
        
        if (email || phone) {
          trackCartEvent('checkout_info_added', {
            email: email || null,
            phone: phone || null
          });
        }
      });

      // Track cart abandonment (when leaving the page with items in cart)
      let cartData = null;
      
      // Get current cart data
      if (typeof wc_cart_fragments_params !== 'undefined') {
        const cartFragmentKey = wc_cart_fragments_params.fragment_name;
        const cartFragment = sessionStorage.getItem(cartFragmentKey);
        
        if (cartFragment) {
          try {
            const fragments = JSON.parse(cartFragment);
            if (fragments && fragments.div) {
              cartData = {
                fragments: true,
                total: $('.cart-subtotal .amount').text()
              };
            }
          } catch (e) {
            console.error('CartConnect: Error parsing cart fragments', e);
          }
        }
      }
      
      // Track page leave with items in cart
      $(window).on('beforeunload', function() {
        if (cartData && (window.location.href.includes('/cart/') || window.location.href.includes('/checkout/'))) {
          trackCartEvent('cart_abandoned', cartData);
        }
      });
      
      // Track successful purchase
      if (window.location.href.includes('/order-received/') || window.location.href.includes('/thank-you/')) {
        trackCartEvent('purchase_completed', {
          order_id: window.location.pathname.split('/').filter(Boolean).pop()
        });
      }
    });
  }
})();
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    
    toast({
      title: "Script copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedScript], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cartconnect-script.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Script baixado!",
      description: "O arquivo cartconnect-script.js foi baixado.",
    });
  };

  return (
    <DashboardLayout title="Script de Integração">
      <Tabs defaultValue="script" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="script">Gerar Script</TabsTrigger>
          <TabsTrigger value="instructions">Instruções</TabsTrigger>
          <TabsTrigger value="advanced">Configurações Avançadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="script">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code2 className="h-5 w-5 mr-2 text-whatsapp" />
                Script de Integração para WooCommerce
              </CardTitle>
              <CardDescription>
                Adicione este script à sua loja para começar a capturar eventos de abandono de carrinho.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-slate-950 p-4 overflow-x-auto mb-6">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  <code>{generatedScript}</code>
                </pre>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleCopy}
                  className="flex items-center"
                  variant={copied ? "outline" : "default"}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copiado!" : "Copiar Script"}
                </Button>
                
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Script
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
                <h3 className="text-blue-800 font-medium mb-2">
                  Seu token de usuário único
                </h3>
                <p className="text-blue-700 text-sm">
                  <strong>{userToken}</strong>
                </p>
                <p className="text-blue-600 text-xs mt-2">
                  Este token identifica sua conta. Não compartilhe com terceiros.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="instructions">
          <Card>
            <CardHeader>
              <CardTitle>Como Integrar com WooCommerce</CardTitle>
              <CardDescription>
                Siga estas instruções para adicionar o script à sua loja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Método 1: Usando um Plugin</h3>
                <div className="space-y-4 ml-6 mt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Opção 1: Header and Footer Scripts</h4>
                    <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                      <li>Instale o plugin "Header and Footer Scripts" na sua loja WordPress</li>
                      <li>Acesse WP Admin → Configurações → Header and Footer Scripts</li>
                      <li>Cole o script fornecido na seção "Scripts no Header"</li>
                      <li>Salve as alterações</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Opção 2: WPCode</h4>
                    <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                      <li>Instale o plugin "WPCode" (anteriormente Insert Headers and Footers)</li>
                      <li>Acesse WP Admin → WPCode → Adicionar Snippet</li>
                      <li>Cole o script fornecido</li>
                      <li>Selecione "Ativo" e defina a localização como "Header"</li>
                      <li>Salve as alterações</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Método 2: Editando o Tema</h3>
                <div className="ml-6 mt-4 text-gray-700 space-y-2">
                  <p className="text-amber-600 font-medium text-sm">
                    ⚠️ Este método requer conhecimento técnico e pode ser perdido em atualizações de tema.
                  </p>
                  <ol className="list-decimal ml-6 space-y-2">
                    <li>Acesse WP Admin → Aparência → Editor de Temas</li>
                    <li>Localize o arquivo "header.php" do seu tema</li>
                    <li>Cole o script fornecido logo acima da tag <code className="bg-gray-100 px-1 rounded">{'</head>'}</code></li>
                    <li>Atualize o arquivo</li>
                  </ol>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Método 3: Para usuários do Elementor</h3>
                <div className="ml-6 mt-4 text-gray-700 space-y-2">
                  <ol className="list-decimal ml-6 space-y-2">
                    <li>Instale o plugin "Elementor Header & Footer Builder"</li>
                    <li>Crie um novo Bloco de Header</li>
                    <li>Adicione um widget "HTML" e cole o script</li>
                    <li>Publique e aplique ao seu site</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h3 className="text-green-800 font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Validando a Instalação
                </h3>
                <p className="text-green-700 text-sm">
                  Após instalar o script, volte ao CartConnect e clique em "Validar Integração".
                  Faça um teste adicionando produtos ao carrinho e iniciando o checkout para confirmar
                  que os eventos estão sendo registrados corretamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>
                Personalize o comportamento do script de rastreamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 italic text-sm mb-6">
                Esta funcionalidade estará disponível no plano Premium.
              </p>
              
              <div className="space-y-6 opacity-50 pointer-events-none">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-sm font-medium col-span-2">
                      Tempo de espera para abandono (min)
                    </label>
                    <input
                      type="number"
                      className="col-span-2 rounded-md border border-gray-300 px-3 py-2"
                      defaultValue={5}
                      disabled
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-sm font-medium col-span-2">
                      Valor mínimo do carrinho (R$)
                    </label>
                    <input
                      type="number"
                      className="col-span-2 rounded-md border border-gray-300 px-3 py-2"
                      defaultValue={50}
                      disabled
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-sm font-medium col-span-2">
                      Dias para expirar cookie
                    </label>
                    <input
                      type="number"
                      className="col-span-2 rounded-md border border-gray-300 px-3 py-2"
                      defaultValue={7}
                      disabled
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-sm font-medium col-span-2">
                      Personalizar seletor dos produtos
                    </label>
                    <input
                      type="text"
                      className="col-span-2 rounded-md border border-gray-300 px-3 py-2"
                      defaultValue=".cart_item"
                      disabled
                    />
                  </div>
                </div>
                
                <Button className="w-full" disabled>
                  Fazer Upgrade para Desbloquear
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ScriptGenerator;
