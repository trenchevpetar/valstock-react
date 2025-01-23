import { Image } from "@/store/types/images.types.ts";

export interface Album {
  id?: string,
  name: string;
  images: Array<Image>
}
