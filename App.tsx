
import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./src/components/layout/Layout";
import Dashboard from "./src/components/dashboard/Dashboard";
import WhatsAppConnect from "./src/components/whatsapp/WhatsAppConnect";
import ScriptGenerator from "./src/components/script/ScriptGenerator";
import MessageTemplates from "./src/components/templates/MessageTemplates";
import MessageHistory from "./src/components/history/MessageHistory";
import Admin from "./src/pages/Admin";
import AdminDashboard from "./src/pages/AdminDashboard";
import NotFound from "./src/pages/NotFound";
import AdminWhatsApp from "./src/pages/AdminWhatsApp";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <Layout><Dashboard /></Layout>
            } />
            <Route path="/whatsapp" element={
              <Layout><WhatsAppConnect /></Layout>
            } />
            <Route path="/script" element={
              <Layout><ScriptGenerator /></Layout>
            } />
            <Route path="/templates" element={
              <Layout><MessageTemplates /></Layout>
            } />
            <Route path="/history" element={
              <Layout><MessageHistory /></Layout>
            } />
            <Route path="/admin" element={
              <Layout><Admin /></Layout>
            } />
            <Route path="/admin-dashboard" element={
              <Layout><AdminDashboard /></Layout>
            } />
            <Route path="/admin-whatsapp" element={
              <Layout><AdminWhatsApp /></Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
