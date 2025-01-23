import { ReactNode, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Button } from "@/components/ui/button.tsx";

import { useAlbumsStore } from "@/store/albums.ts";
import { Image } from "@/store/types/images.types.ts";

import './album-snap.css';

export const AlbumSnap = () => {
  const containerRef = useRef<HTMLDivElement[]>([]);
  const { albums, deleteImageFromAlbum } = useAlbumsStore();

  const handleScroll = (index: number, direction: 'next' | 'prev') => {
    const container = containerRef.current[index]
    if (!container) return;

    const scrollAmount = container.offsetWidth;

    if (direction === 'next') {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    } else {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !containerRef.current.includes(el)) {
      containerRef.current.push(el);
    }
  };

  const renderControls = (imagesLength : number, index : number) : ReactNode => {
    if (imagesLength === 0) return <h1 className="text-xl pb-4 font-semibold">No images added yet</h1>
    else if (imagesLength > 1) {
      return <div className="album-track-controls">
        <Button onClick={() => handleScroll(index, 'prev')}>Prev</Button>
        <Button onClick={() => handleScroll(index, 'next')}>Next</Button>
      </div>
    }
  }

  const handleRemoveFromAlbum = (albumId: string | number | undefined, imageId: string | number) => {
    deleteImageFromAlbum(albumId, imageId)
  }

  return (
    <>
      {albums?.map((album, index) => {
        return (
          <ul className="album-snap">
            <li key={index}>
              <h1 className="text-3xl pb-4 font-semibold">Album name: {album.name}</h1>
              <div className="album-track-wrapper">
                <div className="album-track" ref={addToRefs}>
                  {album?.images.map((image: Image) => {
                    return (
                      <div className="album-track-item">
                        <Button
                          variant="destructive"
                          className="remove-from-album"
                          onClick={() => handleRemoveFromAlbum(album.id, image.id)}
                        >
                          Remove from album
                        </Button>
                        <LazyLoadImage
                          key={image.id}
                          src={image.download_url}
                        />
                      </div>
                    )
                  })}
                </div>
                {renderControls(album.images.length, index)}
              </div>
            </li>
          </ul>
        )
      })}
    </>
  )
}
