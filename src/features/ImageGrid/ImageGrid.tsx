import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useImagesStore } from "@/store/images.ts";

import './image-grid.css';

export const ImageGrid = () => {
  const { fetchAndStoreImages, images, error, isLoading } = useImagesStore();

  useEffect(() => {
    if (!images.length) {
      fetchAndStoreImages()
    }
  }, [images, fetchAndStoreImages]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error happened...</div>
  }

  return (
    <ul className="image-grid">
      {images?.map((item) => {
        return <li key={item.id}>
          <Link to={`/image-detail/${item.id}`}>
            <figure>
              <LazyLoadImage
                alt={`Image by ` + item.author}
                effect="blur"
                width={item.width}
                height={item.height}
                src={item.download_url}
                wrapperProps={{
                  style: { transitionDelay: "1s" },
                }}
              />
              <figcaption>{`Image by ` + item.author}</figcaption>
            </figure>
          </Link>
        </li>
      })}
    </ul>
  )
}
