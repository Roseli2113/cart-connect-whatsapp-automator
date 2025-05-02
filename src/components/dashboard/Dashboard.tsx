
import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-600">Carrinhos Recuperados</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
