/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "./Image";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h1 className="text-3xl mr-48">Photos of {place.title}</h1>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 gap-1 flex py-2 px-4 rounded-full shadow shadow-black bg-white text-black"
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-xmark" size="lg" />
              Close photos
            </button>
          </div>
          {place.photos.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <Image src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="rounded-3xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover"
                  src={place.photos[0]}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover"
                src={place.photos[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover relative top-2"
                  src={place.photos[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-2 absolute bottom-2 py-2 px-4 right-2 bg-white rounded-2xl shadow-md shadow-gray-500"
        >
          <FontAwesomeIcon icon="fa-solid fa-images" size="lg" />
          Show more photos
        </button>
      </div>
    </>
  );
};

export default PlaceGallery;
