import React, { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

import { useAlbumsStore } from "@/store/albums.ts";

export const AlbumDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [albumName, setAlbumName] = useState('')
  const { createNewAlbum } = useAlbumsStore()

  const handleConfirm = () => {
    createNewAlbum({
      name: albumName,
      images: []
    });
    onOpenChange(false);
  }

  const handleClose = () => {
    onOpenChange(false);
  }

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    setAlbumName('');
  }

  const handleAlbumName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(event.target.value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add new album</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new album</DialogTitle>
          <DialogDescription>
            Provide album name to add new album
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="album-name" className="sr-only">
              Album name
            </Label>
            <Input
              onChange={handleAlbumName}
              type="text"
              value={albumName}
              id="album-name"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleConfirm}>Add</Button>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
