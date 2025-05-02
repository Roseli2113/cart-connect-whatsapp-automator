
import React from 'react';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
      <h2 className="text-2xl font-medium text-gray-600 mb-8">Página não encontrada</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        A página que você está procurando pode ter sido removida, renomeada ou talvez nunca tenha existido.
      </p>
      <Link to="/">
        <Button>Voltar para o Início</Button>
      </Link>
    </div>
  );
};

export default NotFound;
