
import React from 'react';
import { 
  BarChart2, 
  ShoppingCart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Sample data for the chart
const chartData = [
  { date: '01/05', abandonados: 12, recuperados: 5, valor: 980 },
  { date: '02/05', abandonados: 19, recuperados: 8, valor: 1200 },
  { date: '03/05', abandonados: 15, recuperados: 7, valor: 890 },
  { date: '04/05', abandonados: 22, recuperados: 9, valor: 1500 },
  { date: '05/05', abandonados: 28, recuperados: 12, valor: 2100 },
  { date: '06/05', abandonados: 17, recuperados: 8, valor: 1300 },
  { date: '07/05', abandonados: 24, recuperados: 10, valor: 1800 },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Carrinhos Abandonados Total</CardTitle>
            <ShoppingCart className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">137</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Valor Pendentes</CardTitle>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 15.890</div>
            <p className="text-xs text-muted-foreground">113 carrinhos abandonados</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-600">Valor Recuperados</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 8.470</div>
            <p className="text-xs text-muted-foreground">24 carrinhos recuperados</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Desempenho de Recuperação</CardTitle>
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
                    if (name === 'valor') return [`R$ ${value}`, 'Valor'];
                    return [value, name === 'abandonados' ? 'Abandonados' : 'Recuperados'];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="abandonados" 
                  stackId="1"
                  stroke="#f97316" 
                  fill="#fdba74" 
                  name="Abandonados"
                />
                <Area 
                  type="monotone" 
                  dataKey="recuperados" 
                  stackId="2" 
                  stroke="#10b981" 
                  fill="#6ee7b7" 
                  name="Recuperados"
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#3b82f6" 
                  fill="#93c5fd"
                  opacity={0.5}
                  name="Valor"
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

export default Dashboard;
