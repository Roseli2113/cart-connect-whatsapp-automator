
import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Template {
  id: string;
  name: string;
  content: string;
  isActive: boolean;
  delay: number;
  triggerType: 'cart_abandoned' | 'purchase_completed';
}

const MessageTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Carrinho Abandonado',
      content: 'Olá, vi que você deixou alguns produtos no carrinho na loja {store_name}. Posso ajudar a finalizar sua compra?',
      isActive: true,
      delay: 30,
      triggerType: 'cart_abandoned'
    },
    {
      id: '2',
      name: 'Agradecimento Pós-Compra',
      content: 'Obrigado pela sua compra na {store_name}! Seu pedido #{order_id} foi recebido e está sendo processado.',
      isActive: true,
      delay: 5,
      triggerType: 'purchase_completed'
    }
  ]);
  
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  
  const handleEditTemplate = (template: Template) => {
    setActiveTemplate(template);
    setEditingTemplate({...template});
  };
  
  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    
    setTemplates(templates.map(t => 
      t.id === editingTemplate.id ? editingTemplate : t
    ));
    
    setActiveTemplate(null);
    setEditingTemplate(null);
    
    toast({
      title: "Template salvo!",
      description: "As alterações foram salvas com sucesso.",
    });
  };
  
  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: 'Novo Template',
      content: 'Digite sua mensagem aqui...',
      isActive: false,
      delay: 30,
      triggerType: 'cart_abandoned'
    };
    
    setTemplates([...templates, newTemplate]);
    handleEditTemplate(newTemplate);
    
    toast({
      title: "Novo template criado",
      description: "Personalize a mensagem conforme sua necessidade.",
    });
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    
    if (activeTemplate?.id === id) {
      setActiveTemplate(null);
      setEditingTemplate(null);
    }
    
    toast({
      title: "Template removido",
      description: "O template foi excluído com sucesso.",
    });
  };
  
  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? {...t, isActive: !t.isActive} : t
    ));
  };

  return (
    <DashboardLayout title="Templates de Mensagem">
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Meus Templates
                  </CardTitle>
                  <Button
                    size="sm"
                    className="h-8 gap-1"
                    onClick={handleCreateTemplate}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Novo</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                          activeTemplate?.id === template.id
                            ? 'bg-primary/10 border border-primary/20'
                            : 'hover:bg-gray-100 border border-gray-100'
                        }`}
                        onClick={() => handleEditTemplate(template)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <MessageCircle className={`h-5 w-5 ${template.isActive ? 'text-primary' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-xs text-gray-500">
                              {template.triggerType === 'cart_abandoned' 
                                ? 'Carrinho Abandonado' 
                                : 'Pós-Compra'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={template.isActive}
                            onCheckedChange={() => handleToggleActive(template.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTemplate(template.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {templates.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-500 mb-3">Nenhum template criado</p>
                        <Button onClick={handleCreateTemplate}>
                          Criar Primeiro Template
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Template Editor */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingTemplate ? 'Editar Template' : 'Selecione um template para editar'}
                  </CardTitle>
                  <CardDescription>
                    {editingTemplate 
                      ? 'Personalize sua mensagem e configurações' 
                      : 'Clique em um template na lista ao lado ou crie um novo'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingTemplate ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="template-name">Nome do Template</Label>
                        <Input
                          id="template-name"
                          value={editingTemplate.name}
                          onChange={(e) => setEditingTemplate({
                            ...editingTemplate,
                            name: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="template-type">Tipo de Gatilho</Label>
                        <select
                          id="template-type"
                          className="w-full rounded-md border border-gray-300 p-2"
                          value={editingTemplate.triggerType}
                          onChange={(e) => setEditingTemplate({
                            ...editingTemplate,
                            triggerType: e.target.value as 'cart_abandoned' | 'purchase_completed'
                          })}
                        >
                          <option value="cart_abandoned">Carrinho Abandonado</option>
                          <option value="purchase_completed">Pós-Compra</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="template-delay">
                          Atraso (minutos após o evento)
                        </Label>
                        <Input
                          id="template-delay"
                          type="number"
                          min={1}
                          max={1440}
                          value={editingTemplate.delay}
                          onChange={(e) => setEditingTemplate({
                            ...editingTemplate,
                            delay: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="template-content">Conteúdo da Mensagem</Label>
                          <div className="text-xs text-gray-500">
                            Variáveis: {'{store_name}'}, {'{customer_name}'}, {'{order_id}'}
                          </div>
                        </div>
                        <Textarea
                          id="template-content"
                          className="min-h-[150px]"
                          value={editingTemplate.content}
                          onChange={(e) => setEditingTemplate({
                            ...editingTemplate,
                            content: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="template-active"
                            checked={editingTemplate.isActive}
                            onCheckedChange={(checked) => setEditingTemplate({
                              ...editingTemplate,
                              isActive: checked
                            })}
                          />
                          <Label htmlFor="template-active">Ativar este template</Label>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Button
                            onClick={handleSaveTemplate}
                            className="flex items-center gap-2"
                          >
                            <Save className="h-4 w-4" />
                            Salvar Alterações
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setActiveTemplate(null);
                              setEditingTemplate(null);
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[350px]">
                      <div className="text-center">
                        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Selecione um template para editar ou crie um novo
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Variáveis Disponíveis</CardTitle>
              <CardDescription>
                Use estas variáveis para personalizar suas mensagens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Variáveis para Carrinho Abandonado</h3>
                  <ul className="space-y-2 text-sm">
                    <li><code className="bg-gray-100 px-1 rounded">{'{store_name}'}</code> - Nome da sua loja</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{customer_name}'}</code> - Nome do cliente (se disponível)</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{product_name}'}</code> - Nome do produto principal</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{cart_total}'}</code> - Valor total do carrinho</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{cart_url}'}</code> - Link direto para o carrinho</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Variáveis para Pós-Compra</h3>
                  <ul className="space-y-2 text-sm">
                    <li><code className="bg-gray-100 px-1 rounded">{'{store_name}'}</code> - Nome da sua loja</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{customer_name}'}</code> - Nome do cliente</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{order_id}'}</code> - Número do pedido</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{order_total}'}</code> - Valor total do pedido</li>
                    <li><code className="bg-gray-100 px-1 rounded">{'{order_status}'}</code> - Status atual do pedido</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Mensagens</CardTitle>
              <CardDescription>
                Personalize como e quando as mensagens são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Envio de Mensagens</h3>
                    <p className="text-sm text-gray-500">
                      Ative ou desative o envio automático de mensagens
                    </p>
                  </div>
                  <Switch id="messages-enabled" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Limite Diário</h3>
                    <p className="text-sm text-gray-500">
                      Máximo de mensagens enviadas por dia
                    </p>
                  </div>
                  <div className="w-24">
                    <Input type="number" defaultValue={50} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Horário de Envio</h3>
                    <p className="text-sm text-gray-500">
                      Restrinja o envio de mensagens a determinados horários
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="time" defaultValue="09:00" className="w-24" />
                    <span>até</span>
                    <Input type="time" defaultValue="20:00" className="w-24" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <h3 className="font-medium">Dias da Semana</h3>
                    <p className="text-sm text-gray-500">
                      Dias permitidos para envio de mensagens
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-1"
                          defaultChecked={index > 0 && index < 6}
                        />
                        <span className="text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Assinatura das Mensagens</h3>
                  <p className="text-sm text-gray-500">
                    Texto adicionado ao final de todas as mensagens
                  </p>
                  <Textarea
                    placeholder="Exemplo: Atenciosamente, Equipe da Loja XYZ"
                    defaultValue="Atenciosamente, Equipe de Atendimento"
                  />
                </div>
                
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MessageTemplates;
