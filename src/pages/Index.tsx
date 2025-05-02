
import React from 'react';
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">CartConnect</h1>
        <p className="text-xl text-gray-600 mb-6">
          Integração completa entre WooCommerce e WhatsApp para recuperação de carrinhos abandonados
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-3">Dashboard</h2>
          <p className="mb-4 text-gray-600">Visualize suas estatísticas de recuperação e desempenho.</p>
          <Link to="/dashboard">
            <Button className="w-full">Acessar Dashboard</Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-3">WhatsApp</h2>
          <p className="mb-4 text-gray-600">Configure sua conexão com o WhatsApp Business API.</p>
          <Link to="/whatsapp">
            <Button className="w-full">Configurar WhatsApp</Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-3">Scripts</h2>
          <p className="mb-4 text-gray-600">Configuração de webhook para integração com seu site.</p>
          <Link to="/script">
            <Button className="w-full">Configurar Integração</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-3">Templates</h2>
          <p className="mb-4 text-gray-600">Crie e personalize seus templates de mensagens.</p>
          <Link to="/templates">
            <Button className="w-full">Gerenciar Templates</Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-3">Histórico</h2>
          <p className="mb-4 text-gray-600">Visualize o histórico de mensagens enviadas.</p>
          <Link to="/history">
            <Button className="w-full">Ver Histórico</Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-3">Administração</h2>
          <p className="mb-4 text-gray-600">Acesse as funcionalidades administrativas.</p>
          <Link to="/admin">
            <Button className="w-full">Área Admin</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
