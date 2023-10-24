import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return " ";
  return (
    <div className="mt-4 -mx-8 bg-gray-100 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="block my-2 font-semibold underline"
        target="_blank"
        href={"https://www.google.com/maps/place/" + place.address}
        rel="noreferrer"
      >
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                className="aspect-square object-cover"
                src={"http://localhost:8080/uploads/" + place.photos[0]}
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={"http://localhost:8080/uploads/" + place.photos[1]}
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover relative top-2"
                src={"http://localhost:8080/uploads/" + place.photos[2]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
