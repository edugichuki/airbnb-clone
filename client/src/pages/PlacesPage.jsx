/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceImage from "../components/PlaceImage";
import AccountNav from "./AccountNav";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1"
          to={"/account/places/new"}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 p-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-100 cursor-pointer flex gap-4 p-4 rounded-2xl mb-8"
            >
              <div className="flex w-32 h-32 bg-slate-300 grow shrink-0">
                <PlaceImage place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
