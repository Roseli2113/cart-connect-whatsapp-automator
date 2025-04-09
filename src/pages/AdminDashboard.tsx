
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

// Use the client from the existing integrations folder
import { supabase } from "@/integrations/supabase/client";

// Define the user type based on the database schema
type Usuario = {
  id: string;
  nome: string | null;
  email: string | null;
  plano: string | null;
  status_conexao: string | null;
  mensagens_usadas: number | null;
  criado_em: string | null;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro ao buscar usuários",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const updateUserPlan = async (userId: string, currentPlan: string) => {
    const newPlan = currentPlan === 'pago' ? 'gratuito' : 'pago';
    
    const { error } = await supabase
      .from('usuarios')
      .update({ plano: newPlan })
      .eq('id', userId);
      
    if (error) {
      console.error('Erro ao atualizar plano:', error);
      toast({
        title: "Erro ao atualizar plano",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Plano atualizado",
        description: `Usuário alterado para plano ${newPlan}`,
      });
      fetchUsers();
    }
  };

  const resetUserMessages = async (userId: string) => {
    const { error } = await supabase
      .from('usuarios')
      .update({ mensagens_usadas: 0 })
      .eq('id', userId);
      
    if (error) {
      console.error('Erro ao resetar mensagens:', error);
      toast({
        title: "Erro ao resetar mensagens",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Mensagens resetadas",
        description: "Contador de mensagens zerado com sucesso",
      });
      fetchUsers();
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Usuários</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <p>Carregando usuários...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10">
            <p>Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{user.nome}</h2>
                  <p className="text-gray-600 mb-3">{user.email}</p>
                  
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Plano:</span>{" "}
                      <span className={`inline-block px-2 py-1 rounded ${user.plano === 'pago' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.plano}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`inline-block px-2 py-1 rounded ${user.status_conexao === 'Conectado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status_conexao}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Mensagens:</span>{" "}
                      {user.mensagens_usadas}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => updateUserPlan(user.id, user.plano || '')}
                    >
                      Mudar para {user.plano === 'pago' ? 'Gratuito' : 'Pago'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="text-red-600 hover:text-red-700" 
                      onClick={() => resetUserMessages(user.id)}
                    >
                      Zerar Mensagens
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
