import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ArticlePage from "./pages/ArticlePage";  
import RedirectToAdmin from './pages/RedirectToAdmin';
import Contact from './pages/Contact';

const queryClient = new QueryClient();

const keepServerAwake = async () => {
  try {
    await fetch("https://portalsini-backend-deploy.fly.dev/ping"); // Endpoint que não afeta o banco de dados
  } catch (error) {
    console.error("Erro ao manter o servidor ativo:", error);
  }
};

const App = () => {
  useEffect(() => {
    keepServerAwake(); // Executa imediatamente ao carregar

    const interval = setInterval(keepServerAwake, 10 * 60 * 1000); // A cada 10 minutos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/admin" element={<RedirectToAdmin />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
