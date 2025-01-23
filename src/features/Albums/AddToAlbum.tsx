import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

import { useAlbumsStore } from "@/store/albums.ts";
import { Image } from "@/store/types/images.types.ts";

import { useToast } from "@/hooks/use-toast.ts";

export const AddToAlbum = ({ image }: { image: Image }) => {
  const { albums, addImageToExistingAlbum } = useAlbumsStore();
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
  const { toast } = useToast()

  const onAlbumChange = (checked: boolean, id: string) => {
    setSelectedAlbums((prevSelected) =>
      checked ? [...prevSelected, id] : prevSelected.filter((albumId) => albumId !== id)
    );

    addImageToExistingAlbum(id, image, (toastObject) => {
      toast(toastObject)
    }, (toastObject) => {
      toast(toastObject)
    })
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Pick album</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {albums.length ?
          <DropdownMenuLabel>Existing albums</DropdownMenuLabel>
          : <DropdownMenuLabel>Create albums first</DropdownMenuLabel>
        }
        <DropdownMenuSeparator />
        {albums.map(({ name, id }) => {
          return (
            id ? <DropdownMenuCheckboxItem
              key={id}
              checked={selectedAlbums.includes(id)}
              onCheckedChange={(checked) => onAlbumChange(checked, id)}
              onSelect={(e) => e.preventDefault()}
            >
              {name}
            </DropdownMenuCheckboxItem> : null
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
