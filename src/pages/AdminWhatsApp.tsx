
import React from 'react';

const AdminWhatsApp = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Configurações de WhatsApp</h1>
        <p className="text-gray-600">Gerenciamento das configurações globais do WhatsApp</p>
      </header>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Configurações API</h2>
        <p className="mb-2 text-gray-600">
          Esta seção permite gerenciar as configurações globais da API do WhatsApp Business.
        </p>
      </div>
    </div>
  );
};

export default AdminWhatsApp;
