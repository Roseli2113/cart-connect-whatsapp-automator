
import React from 'react';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Área Administrativa</h1>
        <p className="text-gray-600">Gerencie configurações e usuários do sistema</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Dashboard Admin</h2>
          <p className="mb-4 text-gray-600">Visualize estatísticas e métricas administrativas.</p>
          <Link to="/admin-dashboard">
            <Button className="w-full">Acessar Dashboard Admin</Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Configurações WhatsApp</h2>
          <p className="mb-4 text-gray-600">Gerencie configurações globais do WhatsApp.</p>
          <Link to="/admin-whatsapp">
            <Button className="w-full">Configurar WhatsApp</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
