import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner.tsx";

import { DashboardPage } from "@/pages/DashboardPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";

import { SpinnerProvider } from "@/context/SpinnerContext.tsx";
import { ProtectedRoute } from "@/router/ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <SpinnerProvider>
      <Router>
        <Spinner />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </SpinnerProvider>
  )
}

export default AppRoutes;
