import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";

// Pages
import Onboarding from "./pages/Onboarding";
import BrandDashboard from "./pages/brand/BrandDashboard";
import BrandCampaigns from "./pages/brand/BrandCampaigns";
import CreateCampaign from "./pages/brand/CreateCampaign";
import BrandCandidates from "./pages/brand/BrandCandidates";
import CampaignManagement from "./pages/brand/CampaignManagement";
import BrandProposals from "./pages/brand/BrandProposals";
import ApproveCollabs from "./pages/brand/ApproveCollabs";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import CreatorCampaigns from "./pages/creator/CreatorCampaigns";
import CreatorProposals from "./pages/creator/CreatorProposals";
import SendProposal from "./pages/creator/SendProposal";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedType }: { children: React.ReactNode; allowedType?: "brand" | "creator" }) {
  const { userType } = useUser();

  if (!userType) {
    return <Navigate to="/" replace />;
  }

  if (allowedType && userType !== allowedType) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { userType } = useUser();

  return (
    <Routes>
      <Route
        path="/"
        element={
          userType ? (
            <Navigate to={`/${userType}/dashboard`} replace />
          ) : (
            <Onboarding />
          )
        }
      />

      {/* Brand Routes */}
      <Route
        path="/brand/dashboard"
        element={
          <ProtectedRoute allowedType="brand">
            <BrandDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/campaigns"
        element={
          <ProtectedRoute allowedType="brand">
            <BrandCampaigns />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/campaigns/new"
        element={
          <ProtectedRoute allowedType="brand">
            <CreateCampaign />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/campaigns/:id"
        element={
          <ProtectedRoute allowedType="brand">
            <CampaignManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/candidates"
        element={
          <ProtectedRoute allowedType="brand">
            <BrandCandidates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/proposals"
        element={
          <ProtectedRoute allowedType="brand">
            <BrandProposals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/collabs"
        element={
          <ProtectedRoute allowedType="brand">
            <ApproveCollabs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/profile"
        element={
          <ProtectedRoute allowedType="brand">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/profile/settings"
        element={
          <ProtectedRoute allowedType="brand">
            <ProfileSettings />
          </ProtectedRoute>
        }
      />

      {/* Creator Routes */}
      <Route
        path="/creator/dashboard"
        element={
          <ProtectedRoute allowedType="creator">
            <CreatorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/campaigns"
        element={
          <ProtectedRoute allowedType="creator">
            <CreatorCampaigns />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/campaigns/:id/apply"
        element={
          <ProtectedRoute allowedType="creator">
            <SendProposal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/proposals"
        element={
          <ProtectedRoute allowedType="creator">
            <CreatorProposals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/profile"
        element={
          <ProtectedRoute allowedType="creator">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/profile/settings"
        element={
          <ProtectedRoute allowedType="creator">
            <ProfileSettings />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
