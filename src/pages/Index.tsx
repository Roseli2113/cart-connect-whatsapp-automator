
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/auth/AuthForm";
import { MessageCircle, ShoppingCart, Check, ArrowRight } from "lucide-react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      title: "Recuperação de Carrinhos Abandonados",
      description: "Envie mensagens automáticas via WhatsApp para clientes que abandonaram o carrinho, aumentando suas conversões.",
      icon: <ShoppingCart className="h-6 w-6 text-whatsapp" />
    },
    {
      title: "Integração Simples",
      description: "Conexão fácil com WhatsApp Business e instalação simples via script no seu site WooCommerce.",
      icon: <Check className="h-6 w-6 text-whatsapp" />
    },
    {
      title: "Mensagens Personalizadas",
      description: "Crie templates personalizados para diferentes situações, com variáveis dinâmicas para cada cliente.",
      icon: <MessageCircle className="h-6 w-6 text-whatsapp" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-whatsapp" />
            <span className="font-bold text-xl">CartConnect</span>
          </div>
          <div className="space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowLogin(true)}
            >
              Entrar
            </Button>
            <Button
              className="bg-whatsapp hover:bg-whatsapp-dark text-white"
              onClick={() => setShowLogin(true)}
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showLogin ? (
        <main className="flex-grow">
          <section className="py-16 md:py-24 bg-gradient-to-br from-white to-whatsapp/5">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Recupere Carrinhos Abandonados via WhatsApp
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Aumente suas vendas enviando mensagens automáticas via WhatsApp para clientes que abandonaram o carrinho na sua loja WooCommerce.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-whatsapp hover:bg-whatsapp-dark text-white text-lg px-8"
                  onClick={() => setShowLogin(true)}
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Ver Como Funciona
                </Button>
              </div>
              
              <div className="mt-12 md:mt-16 relative">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <img
                    src="https://via.placeholder.com/1200x600?text=CartConnect+Dashboard+Preview"
                    alt="Dashboard Preview"
                    className="w-full rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="h-12 w-12 rounded-full bg-whatsapp/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Em Apenas 3 Passos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-whatsapp text-white text-xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Crie sua conta</h3>
                  <p className="text-gray-600">
                    Registre-se gratuitamente e acesse o painel de controle
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-whatsapp text-white text-xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Conecte seu WhatsApp</h3>
                  <p className="text-gray-600">
                    Escaneie o QR Code com seu WhatsApp Business
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-whatsapp text-white text-xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Instale o script</h3>
                  <p className="text-gray-600">
                    Adicione o script na sua loja WooCommerce e comece a recuperar carrinhos
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Planos Simples</h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
                Comece gratuitamente e faça upgrade à medida que seu negócio cresce
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Gratuito</h3>
                    <div className="text-3xl font-bold mb-4">R$ 0<span className="text-lg text-gray-500 font-normal">/mês</span></div>
                    <p className="text-gray-600 mb-6">Perfeito para testar e começar</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>50 mensagens por mês</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>1 template de mensagem</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Recuperação de carrinhos</span>
                      </li>
                    </ul>
                    <Button
                      className="w-full"
                      onClick={() => setShowLogin(true)}
                    >
                      Criar Conta Grátis
                    </Button>
                  </div>
                </div>
                
                {/* Premium Plan */}
                <div className="bg-white rounded-lg shadow-lg border-2 border-whatsapp overflow-hidden transform scale-105">
                  <div className="bg-whatsapp text-white py-2 font-semibold">
                    Mais Popular
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Premium</h3>
                    <div className="text-3xl font-bold mb-4">R$ 49<span className="text-lg text-gray-500 font-normal">/mês</span></div>
                    <p className="text-gray-600 mb-6">Para lojas em crescimento</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>1.000 mensagens por mês</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Templates ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Mensagens pós-venda</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Relatórios avançados</span>
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-whatsapp hover:bg-whatsapp-dark"
                      onClick={() => setShowLogin(true)}
                    >
                      Começar Agora
                    </Button>
                  </div>
                </div>
                
                {/* Business Plan */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Business</h3>
                    <div className="text-3xl font-bold mb-4">R$ 149<span className="text-lg text-gray-500 font-normal">/mês</span></div>
                    <p className="text-gray-600 mb-6">Para lojas de alto volume</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>5.000 mensagens por mês</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Múltiplos números de WhatsApp</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>API para personalização</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Suporte prioritário</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowLogin(true)}
                    >
                      Começar Agora
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-whatsapp">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Pronto para recuperar carrinhos abandonados?
              </h2>
              <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
                Comece agora gratuitamente e veja como é fácil aumentar suas vendas com WhatsApp.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-whatsapp text-lg font-medium px-8"
                onClick={() => setShowLogin(true)}
              >
                Criar Minha Conta Grátis
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="h-6 w-6 text-whatsapp" />
                    <span className="font-bold text-xl">CartConnect</span>
                  </div>
                  <p className="text-gray-400">
                    Solução de automação de WhatsApp para e-commerce.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Recursos</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white">Recuperação de Carrinhos</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">WhatsApp Business</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Integração WooCommerce</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Templates de Mensagem</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Empresa</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nós</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Carreiras</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white">Termos de Serviço</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Política de Cookies</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">LGPD</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2023 CartConnect. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </main>
      ) : (
        <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
          <div className="w-full max-w-md">
            <AuthForm />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
