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
        <div className="flex min-h-svh min-w-full items-center justify-center">
          <div className="w-full max-w-sm">
            <AppRoutes />
          </div>
        </div>
        <Toaster/>
      </ThemeProvider>
    </>
  )
}

export default App
