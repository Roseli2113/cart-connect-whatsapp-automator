
import React, { useState } from 'react';
import WebhookURLGenerator from './WebhookURLGenerator';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Check, RefreshCcw, LineChart, ArrowRight } from "lucide-react";

const ScriptGenerator = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Mock statistics data
  const stats = {
    webhooksCreated: 47,
    successRate: 92,
    lastWeekCalls: 155,
    conversionRate: 23.4
  };

  const handleValidateIntegration = () => {
    setIsValidating(true);
    // Simulate validation
    setTimeout(() => {
      setIsValidated(true);
      setIsValidating(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Configuração do Script</h1>
          <p className="text-gray-500 mt-1">Gere e configure o webhook de integração com o WooCommerce</p>
        </div>
        <Button 
          className={`${isValidated ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={handleValidateIntegration}
          disabled={isValidated || isValidating}
        >
          {isValidating ? (
            <span className="flex items-center">
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> 
              Validando...
            </span>
          ) : isValidated ? (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> 
              Integração Validada
            </span>
          ) : (
            <span className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4" />
              Validar Integração
            </span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Webhooks Criados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.webhooksCreated}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +12% <LineChart className="h-3 w-3 ml-1" />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.successRate}%</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${stats.successRate}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Chamadas na Última Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.lastWeekCalls}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +24% <LineChart className="h-3 w-3 ml-1" />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-gray-500 mt-1">
              Acima da média do mercado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="border-l-4 border-primary">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Configuração de Webhook</CardTitle>
          </CardHeader>
          <CardContent>
            <WebhookURLGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptGenerator;
