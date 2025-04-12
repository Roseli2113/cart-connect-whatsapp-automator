import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./components/dashboard/Dashboard";
import WhatsAppConnect from "./components/whatsapp/WhatsAppConnect";
import ScriptGenerator from "./components/script/ScriptGenerator";
import MessageTemplates from "./components/templates/MessageTemplates";
import MessageHistory from "./components/history/MessageHistory";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminWhatsApp from "./pages/AdminWhatsApp";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/whatsapp" element={<WhatsAppConnect />} />
            <Route path="/script" element={<ScriptGenerator />} />
            <Route path="/templates" element={<MessageTemplates />} />
            <Route path="/history" element={<MessageHistory />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-whatsapp" element={<AdminWhatsApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
