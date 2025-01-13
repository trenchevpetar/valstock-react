import { Toaster } from "@/components/ui/toaster.tsx";

import { ThemeProvider } from "@/features/ThemeSelector/theme-provider.tsx";
import { ToggleTheme } from "@/features/ThemeSelector/toggle-theme.tsx";

import { useAuthStore } from "@/store/auth.ts";

import AppRoutes from "@/router/AppRoutes.tsx";

import './App.css'

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {isAuthenticated ? <ToggleTheme /> : null}
        <div className="app">
          <AppRoutes />
        </div>
        <Toaster/>
      </ThemeProvider>
    </>
  )
}

export default App
