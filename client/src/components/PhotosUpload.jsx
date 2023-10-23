/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PhotoUpload = ({ addedPhotos, onChange }) => {
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
          addedPhotos.map((link) => (
            <div key={link} className="h-32 flex">
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:8080/uploads/" + link}
              />
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
