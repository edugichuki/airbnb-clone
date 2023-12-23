/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Image from "./Image";

const PhotoUpload = ({ addedPhotos = [], onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      uri: photoLink,
    });
    onChange((preValue) => {
      return [...preValue, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/uploads", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((preValue) => {
          return [...preValue, ...filenames];
        });
      });
  };
  const removePhoto = (e, filename) => {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };
  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    // const addedPhotosWithoutSelected = addedPhotos.filter(
    //   (photo) => photo !== filename
    // );
    // const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    // onChange(newAddedPhotos);
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  };
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => {
            setPhotoLink(e.target.value);
          }}
          placeholder={"Add using a link...jpg"}
        />
        <button
          className="bg-gray-100 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photos
        </button>
      </div>

      <div className="gap-2  mt-2 grid md:grid-cols-3 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div key={index} className="h-32 flex relative">
              <Image className="rounded-2xl w-full object-cover" src={link} />
              <button
                onClick={(e) => {
                  removePhoto(e, link);
                }}
                className="absolute cursor-pointer bottom-1 right-1 text-white bg-black p-2 px-2.5 py-2 bg-opacity-50 rounded-2xl"
              >
                <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg" />
              </button>
              <button
                onClick={(e) => {
                  selectAsMainPhoto(e, link);
                }}
                className="absolute cursor-pointer bottom-1 left-1 text-white bg-black p-2 px-2.5 py-2 bg-opacity-50 rounded-2xl"
              >
                {link === addedPhotos[0] && (
                  <FontAwesomeIcon icon="fa-solid fa-star" size="lg" />
                )}
                {link !== addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 gap-2 flex justify-center items-center">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotoUpload;
