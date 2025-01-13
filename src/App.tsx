import { Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster.tsx";

import { ThemeProvider } from "@/features/ThemeSelector/theme-provider.tsx";
import { ToggleTheme } from "@/features/ThemeSelector/toggle-theme.tsx";

import { useAuthStore } from "@/store/auth.ts";

import { DashboardPage } from "@/pages/DashboardPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";

import './App.css'

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {isAuthenticated ? <ToggleTheme /> : null}
        <div className="flex min-h-svh min-w-full items-center justify-center">
          <div className="w-full max-w-sm">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </div>
        </div>
        <Toaster/>
      </ThemeProvider>
    </>
  )
}

export default App
