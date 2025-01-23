import { AlbumDialog } from "@/features/Albums/AlbumDialog.tsx";
import { AlbumSnap } from "@/features/Albums/AlbumSnap.tsx";

export const Albums = () => {
  return (
    <>
      <AlbumDialog />
      <div className="image-grid">
        <AlbumSnap />
      </div>
    </>
  )
}
