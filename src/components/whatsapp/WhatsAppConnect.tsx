
import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, QrCode, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WhatsAppConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateFakeQrCode = () => {
    // For demo purposes, we'll use a placeholder QR code image
    setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CartConnectDemoQrCode");
  };

  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate API connection process
    setTimeout(() => {
      generateFakeQrCode();
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsConnecting(false);
    setQrCodeUrl("");
    
    toast({
      title: "WhatsApp desconectado",
      description: "Sua conta do WhatsApp Business foi desconectada.",
    });
  };

  const handleRefreshQrCode = () => {
    setQrCodeUrl("");
    
    // Simulate refreshing QR code
    setTimeout(() => {
      generateFakeQrCode();
      
      toast({
        title: "QR Code atualizado",
        description: "Um novo QR Code foi gerado para conexão.",
      });
    }, 1000);
  };

  const handleFakeConnect = () => {
    // Simulate successful connection
    setIsConnected(true);
    setIsConnecting(false);
    
    toast({
      title: "WhatsApp conectado com sucesso!",
      description: "Seu WhatsApp Business está pronto para enviar mensagens.",
    });
  };

  return (
    <DashboardLayout title="WhatsApp">
      <Tabs defaultValue="connect" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="connect">Conectar WhatsApp</TabsTrigger>
          <TabsTrigger value="status" disabled={!isConnected}>
            Status da Conexão
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="connect" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-whatsapp" />
                Conectar WhatsApp Business
              </CardTitle>
              <CardDescription>
                Escaneie o QR Code com seu WhatsApp Business para começar a enviar mensagens automáticas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnecting && !isConnected ? (
                <div className="flex flex-col items-center space-y-6 py-8">
                  <div className="h-24 w-24 rounded-full bg-whatsapp/10 flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-whatsapp" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium">Conecte seu WhatsApp Business</h3>
                    <p className="text-gray-500 max-w-md">
                      A conexão é feita através de QR Code, similar ao WhatsApp Web. 
                      Suas mensagens serão enviadas a partir do seu número comercial.
                    </p>
                  </div>
                  <Button
                    onClick={handleConnect}
                    className="bg-whatsapp hover:bg-whatsapp-dark"
                  >
                    Iniciar Conexão
                  </Button>
                </div>
              ) : isConnecting && !isConnected ? (
                <div className="flex flex-col items-center space-y-6 py-8">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium mb-6">Escaneie o QR Code</h3>
                    
                    {qrCodeUrl ? (
                      <div className="border border-gray-200 rounded-lg p-4 bg-white">
                        <img
                          src={qrCodeUrl}
                          alt="WhatsApp QR Code"
                          width={200}
                          height={200}
                          className="mx-auto"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 w-48">
                        <div className="animate-spin h-8 w-8 border-4 border-whatsapp border-t-transparent rounded-full"></div>
                      </div>
                    )}
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        1. Abra o WhatsApp Business no seu celular<br />
                        2. Toque em Menu ou Configurações<br />
                        3. Selecione WhatsApp Web/Desktop<br />
                        4. Escaneie este QR Code
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                        {qrCodeUrl && (
                          <>
                            <Button
                              variant="outline"
                              onClick={handleRefreshQrCode}
                              className="flex items-center"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Atualizar QR Code
                            </Button>
                            
                            <Button onClick={handleFakeConnect}>
                              Simular Conexão Bem-sucedida
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6 py-8">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-green-700">WhatsApp Conectado!</h3>
                    <p className="text-gray-600 mt-2">
                      Seu WhatsApp Business está pronto para enviar mensagens automáticas.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleDisconnect}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Desconectar WhatsApp
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dicas para o WhatsApp Business</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li className="text-gray-700">
                  Recomendamos usar um número dedicado do WhatsApp Business para esta integração.
                </li>
                <li className="text-gray-700">
                  Mantenha seu celular conectado à internet para garantir o funcionamento contínuo.
                </li>
                <li className="text-gray-700">
                  Mensagens são enviadas através da API oficial do WhatsApp, seguindo todas as políticas da plataforma.
                </li>
                <li className="text-gray-700">
                  Recomendamos manter o aplicativo do WhatsApp Business aberto ou em segundo plano.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Status da Conexão</CardTitle>
              <CardDescription>
                Informações sobre o WhatsApp Business conectado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="font-medium">Status</span>
                  <span className="flex items-center text-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                    Conectado
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="font-medium">Dispositivo</span>
                  <span className="text-gray-600">iPhone 13 Pro</span>
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="font-medium">Número</span>
                  <span className="text-gray-600">+55 11 9****-****</span>
                </div>
                
                <div className="flex items-center justify-between pb-3">
                  <span className="font-medium">Conectado desde</span>
                  <span className="text-gray-600">Há 5 minutos</span>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={handleDisconnect}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Desconectar WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default WhatsAppConnect;
