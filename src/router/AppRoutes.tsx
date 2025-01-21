import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner.tsx";

import { Navigation } from "@/features/Navigation/navigation.tsx";

import { useAuthStore } from "@/store/auth.ts";

import { DashboardPage } from "@/pages/DashboardPage.tsx";
import { ImageDetail } from "@/pages/ImageDetail.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";

import { SpinnerProvider } from "@/context/SpinnerContext.tsx";
import { ProtectedRoute } from "@/router/ProtectedRoute.tsx";


const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <SpinnerProvider>
      <Router>
        <Spinner />
        {isAuthenticated ? <Navigation /> : null}
        <div className="app">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/image-detail/:id" element={<ImageDetail />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </SpinnerProvider>
  )
}

export default AppRoutes;
