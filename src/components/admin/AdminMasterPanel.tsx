
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { BarChart2, Users, MessageSquare, WifiOff } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";

const loginAdminPassword = "admin123";

export default function AdminMasterPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const users = [
    { name: "João Silva", email: "joao@email.com", plan: "Gratuito", status: "Ativo", connected: true, messages: 47, lastLogin: "08/04/2025" },
    { name: "Ana Souza", email: "ana@email.com", plan: "Pago", status: "Ativo", connected: false, messages: 231, lastLogin: "07/04/2025" },
  ];

  const growthData = [
    { name: "Mar", users: 2, messages: 150 },
    { name: "Abr", users: 5, messages: 278 },
  ];

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-semibold mb-2">Login do Administrador</h2>
        <Input
          type="password"
          placeholder="Digite a senha do admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 max-w-sm"
        />
        <Button onClick={() => setAuthenticated(password === loginAdminPassword)}>Entrar</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Painel Administrativo - Admin Master</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <Users className="text-green-600" />
            <p className="text-sm">Usuários Totais</p>
            <h2 className="text-xl font-bold">{users.length}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <MessageSquare className="text-blue-600" />
            <p className="text-sm">Mensagens Enviadas</p>
            <h2 className="text-xl font-bold">{users.reduce((sum, u) => sum + u.messages, 0)}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <WifiOff className="text-red-600" />
            <p className="text-sm">WhatsApp Desconectado</p>
            <h2 className="text-xl font-bold">{users.filter(u => !u.connected).length}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <BarChart2 className="text-yellow-600" />
            <p className="text-sm">Crescimento</p>
            <h2 className="text-xl font-bold">+12% mês</h2>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold mb-4">Gráfico de Crescimento</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={growthData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#10B981" name="Usuários" />
            <Bar dataKey="messages" fill="#3B82F6" name="Mensagens" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="gratuito">Gratuitos</TabsTrigger>
          <TabsTrigger value="pago">Pagos</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between mb-4">
        <Input placeholder="Buscar por e-mail" className="max-w-xs" />
        <Button>Exportar CSV</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Plano</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Conexão</TableCell>
            <TableCell>Mensagens</TableCell>
            <TableCell>Último Login</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.plan}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell className={user.connected ? "text-green-600" : "text-red-600"}>
                {user.connected ? "Conectado" : "Desconectado"}
              </TableCell>
              <TableCell>{user.messages}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell className="space-x-1">
                <Button variant="outline" size="sm">Ver Perfil</Button>
                <Button variant="ghost" size="sm">Editar Plano</Button>
                <Button variant="outline" size="sm" className="text-red-600">Suspender</Button>
                <Button variant="ghost" size="sm">Resetar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
