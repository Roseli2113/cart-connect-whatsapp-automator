
import React from 'react';
import WebhookURLGenerator from './WebhookURLGenerator';

const ScriptGenerator = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuração de Webhook</h1>
      <WebhookURLGenerator />
    </div>
  );
};

export default ScriptGenerator;
