
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { BarChart2, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Sample data for the chart
const chartData = [
  { date: '01/05', usuarios: 215, mensagens: 5120, taxa: 20.5 },
  { date: '02/05', usuarios: 225, mensagens: 5321, taxa: 21.2 },
  { date: '03/05', usuarios: 230, mensagens: 5490, taxa: 21.8 },
  { date: '04/05', usuarios: 235, mensagens: 5520, taxa: 22.1 },
  { date: '05/05', usuarios: 245, mensagens: 5721, taxa: 23.4 },
  { date: '06/05', usuarios: 240, mensagens: 5650, taxa: 23.0 },
  { date: '07/05', usuarios: 242, mensagens: 5690, taxa: 23.2 },
];

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <p className="text-gray-600">Estatísticas e métricas do sistema</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Total de Usuários</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Mensagens Enviadas</CardTitle>
            <MessageSquare className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,721</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23.4%</div>
            <p className="text-xs text-muted-foreground">+1.3% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Desempenho do Sistema</CardTitle>
            <BarChart2 className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: 'none'
                  }}
                  itemStyle={{ padding: '2px 0' }}
                  formatter={(value, name) => {
                    if (name === 'taxa') return [`${value}%`, 'Taxa de Conversão'];
                    if (name === 'usuarios') return [value, 'Usuários'];
                    return [value, 'Mensagens'];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usuarios" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#93c5fd" 
                />
                <Area 
                  type="monotone" 
                  dataKey="mensagens" 
                  stackId="2" 
                  stroke="#f97316" 
                  fill="#fdba74" 
                />
                <Area 
                  type="monotone" 
                  dataKey="taxa" 
                  stroke="#10b981" 
                  fill="#6ee7b7"
                  opacity={0.7}
                  yAxisId={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
