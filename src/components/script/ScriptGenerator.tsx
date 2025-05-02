
import React, { useState } from 'react';
import WebhookURLGenerator from './WebhookURLGenerator';
import { Button } from "../../../components/ui/button";
import { Check, Settings, LineChart, BarChart, ArrowRightCircle, CheckCircle, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const ScriptGenerator = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [activeStep, setActiveStep] = useState('webhook');

  // Dados simulados para os gráficos
  const webhookStats = {
    total: 127,
    successful: 98,
    failed: 29,
    conversionRate: '77%'
  };

  const handleValidateIntegration = () => {
    setIsValidating(true);
    // Simular validação de integração
    setTimeout(() => {
      setIsValidated(true);
      setIsValidating(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Menu Lateral */}
      <div className="w-64 bg-white shadow-md h-full p-5 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">CartConnect</h2>
          <p className="text-sm text-gray-500">Configuração de Webhook</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Button 
            variant={activeStep === 'webhook' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveStep('webhook')}
          >
            <Settings className="mr-2 h-5 w-5" />
            Configurar Webhook
          </Button>
          
          <Button 
            variant={activeStep === 'stats' ? 'default' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveStep('stats')}
          >
            <BarChart className="mr-2 h-5 w-5" />
            Estatísticas
          </Button>
          
          <Button 
            className={`w-full justify-start mt-8 ${isValidated ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
            onClick={handleValidateIntegration}
            disabled={isValidated || isValidating}
          >
            {isValidating ? (
              <span className="flex items-center">
                <RefreshCcw className="mr-2 h-5 w-5 animate-spin" /> 
                Validando...
              </span>
            ) : isValidated ? (
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> 
                Integração Validada
              </span>
            ) : (
              <span className="flex items-center">
                <ArrowRightCircle className="mr-2 h-5 w-5" />
                Validar Integração
              </span>
            )}
          </Button>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          {activeStep === 'webhook' ? 'Configuração de Webhook' : 'Estatísticas de Integração'}
        </h1>

        {activeStep === 'webhook' ? (
          <WebhookURLGenerator />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Status das Integrações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 flex items-center justify-center">
                  <div className="w-full flex flex-col">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                            Taxa de Sucesso
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-green-600">
                            {webhookStats.conversionRate}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div style={{ width: webhookStats.conversionRate }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm mb-1">Total</p>
                        <p className="text-2xl font-bold text-gray-800">{webhookStats.total}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                        <p className="text-green-500 text-sm mb-1">Sucesso</p>
                        <p className="text-2xl font-bold text-green-600">{webhookStats.successful}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                        <p className="text-red-500 text-sm mb-1">Falhas</p>
                        <p className="text-2xl font-bold text-red-500">{webhookStats.failed}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Status da Integração</h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${isValidated ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={`text-sm ${isValidated ? 'text-green-600' : 'text-gray-500'}`}>
                          {isValidated ? 'Conectado' : 'Não conectado'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Performance de Webhooks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 flex flex-col">
                  <div className="flex-1 flex items-end space-x-2">
                    <div className="bg-primary/20 w-8 rounded-t-lg" style={{ height: '30%' }}></div>
                    <div className="bg-primary/20 w-8 rounded-t-lg" style={{ height: '45%' }}></div>
                    <div className="bg-primary/20 w-8 rounded-t-lg" style={{ height: '60%' }}></div>
                    <div className="bg-primary/30 w-8 rounded-t-lg" style={{ height: '40%' }}></div>
                    <div className="bg-primary/30 w-8 rounded-t-lg" style={{ height: '55%' }}></div>
                    <div className="bg-primary/40 w-8 rounded-t-lg" style={{ height: '75%' }}></div>
                    <div className="bg-primary/50 w-8 rounded-t-lg" style={{ height: '65%' }}></div>
                    <div className="bg-primary/50 w-8 rounded-t-lg" style={{ height: '80%' }}></div>
                    <div className="bg-primary/60 w-8 rounded-t-lg" style={{ height: '90%' }}></div>
                    <div className="bg-primary/70 w-8 rounded-t-lg" style={{ height: '70%' }}></div>
                    <div className="bg-primary/80 w-8 rounded-t-lg" style={{ height: '85%' }}></div>
                    <div className="bg-primary w-8 rounded-t-lg" style={{ height: '95%' }}></div>
                  </div>
                  <div className="grid grid-cols-12 text-xs text-gray-500 pt-2">
                    <div>Jan</div>
                    <div>Fev</div>
                    <div>Mar</div>
                    <div>Abr</div>
                    <div>Mai</div>
                    <div>Jun</div>
                    <div>Jul</div>
                    <div>Ago</div>
                    <div>Set</div>
                    <div>Out</div>
                    <div>Nov</div>
                    <div>Dez</div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <LineChart className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-800 font-medium">77% de aumento na eficiência</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Em comparação com o período anterior
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className={`mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isValidated ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {isValidated ? <Check className="h-4 w-4" /> : "1"}
                      </div>
                      <div>
                        <p className={`font-medium ${isValidated ? 'text-green-600 line-through' : 'text-gray-900'}`}>
                          Validar integração com o WooCommerce
                        </p>
                        <p className="text-sm text-gray-500">
                          Configure seu webhook e clique em "Validar Integração"
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Configurar templates de mensagem
                        </p>
                        <p className="text-sm text-gray-500">
                          Crie seus templates personalizados para recuperação de carrinho
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Ativar campanhas automáticas
                        </p>
                        <p className="text-sm text-gray-500">
                          Configure suas campanhas de recuperação de carrinho abandonado
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptGenerator;
