
import AdminLayout from "@/components/admin/AdminLayout";
import WhatsAppMessageForm from "@/components/admin/WhatsAppMessageForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminWhatsApp() {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Comunicação WhatsApp</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <WhatsAppMessageForm />
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Instruções</CardTitle>
                <CardDescription>Como usar a ferramenta de mensagens WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Formatos de Telefone</h3>
                    <p className="text-sm">Use o formato internacional com código do país (ex: 5511999999999 para Brasil)</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Tipos de Mensagem</h3>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      <li><span className="font-medium">Abandono de Carrinho</span> - Para clientes que não finalizaram compras</li>
                      <li><span className="font-medium">Boas-vindas</span> - Para novos clientes</li>
                      <li><span className="font-medium">Acompanhamento</span> - Para verificar a satisfação do cliente</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Dicas</h3>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      <li>Personalize a mensagem usando o nome do cliente</li>
                      <li>Mantenha mensagens curtas e diretas</li>
                      <li>Respeite horários comerciais para envio</li>
                      <li>Monitore respostas para atendimento rápido</li>
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm text-orange-600">
                      <span className="font-medium">Importante:</span> Certifique-se de que o serviço WhatsApp está ativo e conectado 
                      antes de enviar mensagens.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
