
import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Download, History, RefreshCw, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  phoneNumber: string;
  content: string;
  status: 'delivered' | 'failed' | 'pending';
  timestamp: string;
  type: 'cart_abandoned' | 'purchase_completed';
}

const MessageHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Demo message history data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      phoneNumber: '+5511987654321',
      content: 'Olá, vi que você deixou alguns produtos no carrinho. Posso ajudar a finalizar sua compra?',
      status: 'delivered',
      timestamp: '2023-04-08T10:23:45',
      type: 'cart_abandoned'
    },
    {
      id: '2',
      phoneNumber: '+5511987654322',
      content: 'Obrigado pela sua compra! Seu pedido #1234 foi recebido e está sendo processado.',
      status: 'delivered',
      timestamp: '2023-04-07T15:45:12',
      type: 'purchase_completed'
    },
    {
      id: '3',
      phoneNumber: '+5511987654323',
      content: 'Olá, vi que você deixou alguns produtos no carrinho. Posso ajudar a finalizar sua compra?',
      status: 'failed',
      timestamp: '2023-04-07T09:12:33',
      type: 'cart_abandoned'
    },
    {
      id: '4',
      phoneNumber: '+5511987654324',
      content: 'Olá, vi que você deixou alguns produtos no carrinho. Posso ajudar a finalizar sua compra?',
      status: 'pending',
      timestamp: '2023-04-08T16:05:18',
      type: 'cart_abandoned'
    },
    {
      id: '5',
      phoneNumber: '+5511987654325',
      content: 'Obrigado pela sua compra! Seu pedido #1235 foi recebido e está sendo processado.',
      status: 'delivered',
      timestamp: '2023-04-06T11:34:51',
      type: 'purchase_completed'
    }
  ]);
  
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Histórico atualizado",
        description: "As mensagens foram atualizadas com sucesso.",
      });
    }, 1500);
  };
  
  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "O arquivo CSV será baixado em instantes.",
    });
    
    // Simulate CSV download
    setTimeout(() => {
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent("ID,Telefone,Conteúdo,Status,Data,Tipo\n" + 
        messages.map(m => `${m.id},${m.phoneNumber},"${m.content}",${m.status},${m.timestamp},${m.type}`).join("\n")
      ));
      element.setAttribute("download", "mensagens-cartconnect.csv");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'failed':
        return 'Falhou';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };
  
  const formatPhoneNumber = (phone: string) => {
    // Format for privacy in demo
    return phone.substring(0, 5) + '****' + phone.substring(phone.length - 4);
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatMessageType = (type: string) => {
    switch (type) {
      case 'cart_abandoned':
        return 'Carrinho Abandonado';
      case 'purchase_completed':
        return 'Pós-Compra';
      default:
        return type;
    }
  };
  
  const filteredMessages = messages.filter(message => 
    message.phoneNumber.includes(searchQuery) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatMessageType(message.type).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Histórico">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 mr-2 text-whatsapp" />
              Histórico de Mensagens
            </CardTitle>
            <CardDescription>
              Todas as mensagens enviadas pelo sistema
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Atualizando...' : 'Atualizar'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={handleExport}
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Buscar por número, conteúdo ou tipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mensagem
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <tr key={message.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(message.status)}
                            <span className="ml-1 text-sm text-gray-900">
                              {getStatusText(message.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(message.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPhoneNumber(message.phoneNumber)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            message.type === 'cart_abandoned'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {formatMessageType(message.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {message.content}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Nenhuma mensagem encontrada
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Mostrando {filteredMessages.length} de {messages.length} mensagens
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Resumo de Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Enviadas:</span>
                <span className="font-medium">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Entregues:</span>
                <span className="font-medium text-green-600">
                  {messages.filter(m => m.status === 'delivered').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Com Falha:</span>
                <span className="font-medium text-red-600">
                  {messages.filter(m => m.status === 'failed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pendentes:</span>
                <span className="font-medium text-amber-600">
                  {messages.filter(m => m.status === 'pending').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Carrinho Abandonado:</span>
                <span className="font-medium">
                  {messages.filter(m => m.type === 'cart_abandoned').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pós-Compra:</span>
                <span className="font-medium">
                  {messages.filter(m => m.type === 'purchase_completed').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Taxa de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-whatsapp">
                {Math.round((messages.filter(m => m.status === 'delivered').length / messages.length) * 100)}%
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {messages.filter(m => m.status === 'delivered').length} de {messages.length} mensagens entregues
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessageHistory;
