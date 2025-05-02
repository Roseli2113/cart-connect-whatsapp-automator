
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <p className="text-gray-600">Estatísticas e métricas do sistema</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-600">Total de Usuários</h3>
          <p className="text-3xl font-bold">245</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-600">Mensagens Enviadas</h3>
          <p className="text-3xl font-bold">5,721</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-600">Taxa de Conversão</h3>
          <p className="text-3xl font-bold">23.4%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
