import { QualityItemType } from "@/features/ImageGrid/utils/types.ts";

export interface Image {
  id: number;
  author: string;
  width: string | number;
  height: string | number;
  url: string;
  download_url: string | undefined;
  currentQuality: QualityItemType;
}
