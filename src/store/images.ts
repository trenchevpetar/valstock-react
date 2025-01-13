import { persist } from "zustand/middleware";
import { create } from "zustand/react";

const imageURL = 'https://picsum.photos/v2/list'

export interface Image {
  id: number;
  author: string;
  width: string;
  height: string;
  url: string;
  download_url: string;
}

type Store = {
  images: Array<Image>;
  fetchAndStoreImages: () => Promise<void>;
  getImageById: (id: string | number | undefined) => object | undefined;
  isLoading: boolean;
  error: string | unknown;
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
            set({ images: result })
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
      isLoading: false,
      error: null
    }),
    {
      name: 'image-storage'
    }
  )
)
