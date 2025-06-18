import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // If you're using both, or pick one
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import ViewPage from "./pages/ViewPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Standard Toaster for shadcn/ui useToast hook */}
      <Toaster /> 
      {/* Sonner for rich notifications if also used */}
      <Sonner richColors /> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
          {/* 
            The ViewPage component is set up to potentially use a pageId.
            If your ViewPage logic needs an ID from the URL (e.g., /view-page/some-id), 
            use: <Route path="/view-page/:pageId" element={<ViewPage />} />
            And a generic one if no ID: <Route path="/view-page" element={<ViewPage />} />
            For simplicity, I'll add both if separate logic exists, or one with optional param.
            Given current ViewPage.tsx, :pageId is optional.
          */}
          <Route path="/view-page" element={<ViewPage />} /> 
          <Route path="/view-page/:pageId" element={<ViewPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;