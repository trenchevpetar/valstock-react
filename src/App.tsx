import { Toaster } from "@/components/ui/toaster.tsx";

import { ThemeProvider } from "@/features/ThemeSelector/theme-provider.tsx";

import AppRoutes from "@/router/AppRoutes.tsx";

import './App.css'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster/>
      </ThemeProvider>
    </>
  )
}

export default App
