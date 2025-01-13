import { Button } from "@/components/ui/button.tsx";

import { ImageGrid } from "@/features/ImageGrid/ImageGrid.tsx";

import { useAuthStore } from "@/store/auth.ts";

import { useSpinner } from "@/context/SpinnerContext.tsx";


export const DashboardPage = () => {
  const { setLoading } = useSpinner();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Dashboard Page</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <ImageGrid />
    </>
  )
}
