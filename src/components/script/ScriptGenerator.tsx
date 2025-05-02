
import React, { useState } from 'react';
import WebhookURLGenerator from './WebhookURLGenerator';
import { Button } from "../../components/ui/button";
import { Check } from "lucide-react";

const ScriptGenerator = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleValidateIntegration = () => {
    setIsValidating(true);
    // Simular validação de integração
    setTimeout(() => {
      setIsValidated(true);
      setIsValidating(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Menu Lateral */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Menu do Script</h2>
          <div className="space-y-4">
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={handleValidateIntegration}
              disabled={isValidated || isValidating}
            >
              {isValidating ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⟳</span> 
                  Validando...
                </span>
              ) : isValidated ? (
                <span className="flex items-center">
                  <Check className="mr-2 h-4 w-4" /> 
                  Integração Validada
                </span>
              ) : (
                "Validar Integração"
              )}
            </Button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Configuração de Webhook</h1>
          <WebhookURLGenerator />
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;
