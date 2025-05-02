
import React from 'react';
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <Link to="/">
        <Button>Voltar para a página inicial</Button>
      </Link>
    </div>
  );
};

export default NotFound;
