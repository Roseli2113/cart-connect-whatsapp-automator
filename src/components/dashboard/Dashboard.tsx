
import { 
  MessageCircle, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  DollarSign 
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import StatCard from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  // Dummy data for demonstration
  const stats = [
    {
      title: "Mensagens Enviadas",
      value: 47,
      description: "Este mês",
      icon: <MessageCircle className="h-5 w-5" />,
      trend: "up" as const,
      trendValue: "12% desde mês passado"
    },
    {
      title: "Carrinhos Recuperados",
      value: 8,
      description: "Este mês",
      icon: <ShoppingCart className="h-5 w-5" />,
      trend: "up" as const,
      trendValue: "23% desde mês passado"
    },
    {
      title: "Taxa de Conversão",
      value: "17%",
      description: "Média dos últimos 30 dias",
      icon: <BarChart3 className="h-5 w-5" />,
      trend: "up" as const,
      trendValue: "5% desde mês passado"
    },
    {
      title: "Contatos Ativos",
      value: 124,
      description: "Total de clientes",
      icon: <Users className="h-5 w-5" />,
      trend: "neutral" as const,
      trendValue: "Estável"
    }
  ];

  // Dummy conversion data
  const conversionData = [
    { date: "01/04", recovered: 2, revenue: 389 },
    { date: "02/04", recovered: 1, revenue: 120 },
    { date: "03/04", recovered: 0, revenue: 0 },
    { date: "04/04", recovered: 3, revenue: 570 },
    { date: "05/04", recovered: 2, revenue: 235 }
  ];

  const handleUpgrade = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A opção de upgrade estará disponível em breve."
    });
  };

  return (
    <DashboardLayout title="Dashboard">
      {/* Free plan notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-amber-800">Plano Gratuito</h3>
          <p className="text-sm text-amber-700">
            Você utilizou <strong>47/50</strong> mensagens do seu plano mensal.
          </p>
        </div>
        <Button onClick={handleUpgrade} className="bg-amber-500 hover:bg-amber-600 text-white">
          Fazer Upgrade
        </Button>
      </div>

      {/* Status Summary */}
      <h2 className="text-lg font-medium mb-4">Resumo do Desempenho</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* WhatsApp connection status */}
      <h2 className="text-lg font-medium mb-4">Status da Integração</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
        <Card className="whatsapp-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-whatsapp" />
              WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm font-medium text-red-700">Desconectado</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Conecte seu WhatsApp Business para começar a enviar mensagens automáticas
              de recuperação de carrinhos.
            </p>
            <Button asChild className="bg-whatsapp hover:bg-whatsapp-dark">
              <a href="/whatsapp">Conectar WhatsApp</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="whatsapp-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-whatsapp" />
              WooCommerce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm font-medium text-red-700">Desconectado</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Instale o script na sua loja para capturar eventos de abandono de carrinho
              e começar a recuperar vendas.
            </p>
            <Button asChild className="bg-whatsapp hover:bg-whatsapp-dark">
              <a href="/script">Gerar Script</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent conversions */}
      <h2 className="text-lg font-medium mb-4">Últimas Conversões</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Carrinhos Recuperados Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carrinhos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor (R$)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {conversionData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.recovered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.revenue > 0 ? (
                        <span className="text-green-600 font-medium">
                          R$ {item.revenue.toFixed(2)}
                        </span>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
