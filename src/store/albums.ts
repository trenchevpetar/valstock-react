import { persist } from "zustand/middleware";
import { create } from "zustand/react";

import { Album } from "@/store/types/albums.types.ts";
import { Image } from "@/store/types/images.types.ts";

type Store = {
  albums: Array<Album>,
  createNewAlbum: (album: Album) => void;
  deleteAlbum: (albumId: string | number) => void;
  deleteImageFromAlbum: (albumId: string | number, imageId: string | number) => void;
  addImageToExistingAlbum: (
    albumId: string,
    image: Image,
    errorCallback: (toastObject: object) => void,
    successCallback: (toastObject: object) => void
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
      deleteImageFromAlbum: (albumId, imageId) => {
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
              return album;
            }),
          });
        } else {
          console.error(`Album with id "${albumId}" not found.`);
        }
      },
      addImageToExistingAlbum: (albumId, image, errorCallback, successCallback) => {
        const { albums } = get();
        const album = albums.find((album) => album.id === albumId);

        if (album) {
          set({
            albums: albums.map((album) => {
              if (album.id === albumId) {
                const isImageAlreadyAdded = album.images?.some((img) => img.id === image.id);
                if (isImageAlreadyAdded) {
                  errorCallback({
                    title: `This image is already added to album "${album.name}".`,
                    variant: 'destructive'
                  })
                  return album;
                }

                successCallback({
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
          console.error(`Album with id "${albumId}" not found.`);
        }
      }
    }),
    {
      name: 'albums-storage'
    }
  )
)
