import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';

import { QualityPicker } from "@/features/ImageGrid/QualityPicker.tsx";
import { QualityItemType } from "@/features/ImageGrid/utils/types.ts";

import { useImagesStore } from "@/store/images.ts";

import './image-grid.css';
import { AddToAlbum } from "@/features/Albums/AddToAlbum.tsx";

export const ImageGrid = () => {
  const { fetchAndStoreImages, updateCurrentQuality, images, error, isLoading } = useImagesStore();

  useEffect(() => {
    if (!images.length) {
      fetchAndStoreImages()
    }
  }, [images, fetchAndStoreImages]);

  const onQualityChange = (id: string | number, data: QualityItemType) => {
    updateCurrentQuality(id, data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error happened...</div>
  }

  return (
    <ul className="image-grid">
      {images?.map((item) => {
        return <li key={item.download_url}>
          <Link to={`/image-detail/${item.id}`}>
            <figure>
              <LazyLoadImage
                alt={`Image by ` + item.author}
                effect="blur"
                width={item.currentQuality.width}
                height={item.currentQuality.height}
                src={item.currentQuality.download_url}
                wrapperProps={{
                  style: { transitionDelay: "1s" },
                }}
              />
              <figcaption>{`Image by ` + item.author}</figcaption>
            </figure>
          </Link>
          <QualityPicker onQualityChange={(data) => onQualityChange(item.id, data)} />
          <AddToAlbum image={item} />
        </li>
      })}
    </ul>
  )
}
