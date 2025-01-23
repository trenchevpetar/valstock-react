import { persist } from "zustand/middleware";
import { create } from "zustand/react";

const imageURL = 'https://picsum.photos/v2/list'

import { currentQuality } from "@/features/ImageGrid/utils/currentQuality.ts";
import { QualityItemType } from "@/features/ImageGrid/utils/types.ts";

import { Image } from "@/store/types/images.types.ts"

type Store = {
  images: Array<Image>;
  fetchAndStoreImages: () => Promise<void>;
  getImageById: (id: string | number | undefined) => object | undefined;
  updateCurrentQuality: (id: string | number | undefined, newQuality: QualityItemType) => void;
  isLoading: boolean;
  error: string | unknown;
}

const createDownloadUrl = (imageURL: string | undefined, width: number | string, height: number | string) => {
  if (imageURL) return imageURL.replace(/(\d+)\/(\d+)$/, `${width}/${height}`);
}

export const useImagesStore = create<Store>()(
  persist(
    (set, get) => ({
      images: [],
      fetchAndStoreImages: async () => {
        set({ error: null, isLoading: true })
        try {
          const response = await fetch(imageURL);
          if (!response.ok) {
            set({ images: [], error: "Failed to fetch data" })
          } else {
            const result = await response.json();
            const newResult = result.map((res: Image) => ({
              ...res,
              currentQuality: {
                ...currentQuality,
                download_url: createDownloadUrl(res.download_url, res.width, res.height)
              }
            }))
            set({
              images: newResult
            })
          }
        } catch (err: unknown) {
          set({ error: err, isLoading: false })
        } finally {
          set({ isLoading: false })
        }
      },
      getImageById: (id: string | number | undefined) => {
        const { images } = get();

        return images.find((image) => image.id === id)
      },
      updateCurrentQuality: (id: string | number | undefined, newQuality: QualityItemType) => {
        const { images } = get();

        if (id) {
          const updatedImages = images.map((image) => {
            if (image.id === id) {
              return {
                ...image,
                currentQuality: {
                  ...newQuality,
                  download_url: createDownloadUrl(image.download_url, newQuality.width, newQuality.height)
                }
              }
            }
            return image;
          });

          set({ images: updatedImages })
        }
      },
      isLoading: false,
      error: null
    }),
    {
      name: 'image-storage'
    }
  )
)
