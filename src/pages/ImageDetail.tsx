import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card.tsx";

import { useImagesStore } from "@/store/images.ts";
import { Image } from "@/store/types/images.types.ts";

export const ImageDetail = () => {
  const [imageById, setImageById] = useState<Partial<Image>>({});

  const { id } = useParams();
  const { getImageById } = useImagesStore();

  useEffect(() => {
    const currentImage = getImageById(id);

    if (currentImage) {
      setImageById(currentImage)
    }
  }, [id, setImageById, getImageById]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Image by {imageById.author}</CardTitle>
          <CardDescription>
            width: {imageById.width}px <br />
            height: {imageById.height}px <br />
            <Button variant="link">
              <a href={imageById.url} target='_blank'>Original Image</a>
            </Button>
          </CardDescription>
          <CardContent>
            <LazyLoadImage
              src={imageById.download_url}
              width={imageById.width}
              height={imageById.height}
              alt={`Image by ${imageById.author}`}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </>
  )
}
