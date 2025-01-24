import { persist } from "zustand/middleware";
import { create } from "zustand/react";

import { Album } from "@/store/types/albums.types.ts";
import { Image } from "@/store/types/images.types.ts";

type ToastCallback = (toastObject: object) => void;

type Store = {
  albums: Array<Album>,
  createNewAlbum: (album: Album) => void;
  deleteAlbum: (albumId: string | number | undefined) => void;
  deleteImageFromAlbum: (
    albumId: string | number | undefined,
    imageId: string | number,
    onStateChange: ToastCallback,
  ) => void;
  addImageToExistingAlbum: (
    albumId: string,
    image: Image,
    onStateChange: ToastCallback,
  ) => void;
}

const generateUniqueId = () => `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const useAlbumsStore = create<Store>()(
  persist(
    (set, get) => ({
      albums: [],
      createNewAlbum: (album) => {
        const { albums } = get();
        const newAlbum = {
          id: generateUniqueId(),
          ...album,
          images: []
        }

        const extendedAlbums = [...albums, newAlbum];

        set({
          albums: extendedAlbums
        })
      },
      deleteAlbum: (albumId) => {
        const { albums } = get();
        const updatedAlbums = albums.filter((album) => album.id !== albumId);

        set({ albums: updatedAlbums })
      },
      deleteImageFromAlbum: (albumId, imageId, onStateChange) => {
        const { albums } = get();
        const album = albums.find((album) => album.id === albumId);

        if (album) {
          set({
            albums: albums.map((album) => {
              if (album.id === albumId) {
                return {
                  ...album,
                  images: album.images.filter((image) => image.id !== imageId),
                };
              }
              onStateChange({
                title: 'Successfully deleted the image from the album',
                variant: 'destructive'
              })
              return album;
            }),
          });
        } else {
          onStateChange({
            title: `Album with id "${albumId}" not found.`,
            variant: 'destructive'
          })
        }
      },
      addImageToExistingAlbum: (albumId, image, onStateChange) => {
        const { albums } = get();
        const album = albums.find((album) => album.id === albumId);

        if (album) {
          set({
            albums: albums.map((album) => {
              if (album.id === albumId) {
                const isImageAlreadyAdded = album.images?.some((img) => img.id === image.id);
                if (isImageAlreadyAdded) {
                  onStateChange({
                    title: `This image is already added to album "${album.name}".`,
                    variant: 'destructive'
                  })
                  return album;
                }

                onStateChange({
                  title: `Successfully added image to ${album.name}`
                })
                return {
                  ...album,
                  images: album.images ? [...album.images, image] : [image],
                }
              }
              return album;
            })
          })
        } else {
          onStateChange({
            title: `Album with id "${albumId}" not found.`,
            variant: 'destructive'
          })
        }
      }
    }),
    {
      name: 'albums-storage'
    }
  )
)
