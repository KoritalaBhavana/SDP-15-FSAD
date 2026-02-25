import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import TouristDashboard from "./pages/TouristDashboard";
import HostDashboard from "./pages/HostDashboard";
import GuideDashboard from "./pages/GuideDashboard";
import ChefDashboard from "./pages/ChefDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HomestayListing from "./pages/HomestayListing";
import HomestayDetail from "./pages/HomestayDetail";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Attractions from "./pages/Attractions";
import Guides from "./pages/Guides";
import Dining from "./pages/Dining";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

function ScrollToTopOnRouteChange() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnRouteChange />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tourist-dashboard" element={<TouristDashboard />} />
            <Route path="/host-dashboard" element={<HostDashboard />} />
            <Route path="/guide-dashboard" element={<GuideDashboard />} />
            <Route path="/chef-dashboard" element={<ChefDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/homestays" element={<HomestayListing />} />
            <Route path="/homestay/:id" element={<HomestayDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
