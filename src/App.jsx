import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ArticlePage from "./pages/ArticlePage";  
import { RedirectToAdmin, RedirectToLinkedin } from './pages/RedirectToAdmin';
import Contact from './pages/Contact';

const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/admin" element={<RedirectToAdmin />} />
          <Route path="/linkedin" element={<RedirectToLinkedin />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
