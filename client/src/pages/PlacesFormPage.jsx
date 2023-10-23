import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotoUpload from "../components/PhotosUpload";
import Perks from "../components/perks";
import AccountNav from "./AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, SetCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState("1");
  const [redirect, setRedirect] = useState("");
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      SetCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
    });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-xl mt-4">{text}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };
  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const placeData = {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
  };

  const savePlace = async (e) => {
    e.preventDefault();
    if (id) {
      //update

      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //new place
      await axios.post("/places", {
        ...placeData,
      });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place. Should be short and catchy as in an advertisement"
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="title, for example: My lovely Apartment"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="address"
          />
          {preInput("Photos", "More equals better")}
          <PhotoUpload addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {preInput("Perks", "Select all the perks of your place")}

          <Perks selected={perks} onChange={setPerks} />

          {preInput("Extra infomation", "House rules, etc")}
          <textarea
            value={extraInfo}
            onChange={(e) => {
              setExtraInfo(e.target.value);
            }}
          />
          {preInput(
            "Check in&out times",
            "check in and out times, remember to have some time window for cleaning the room between guests"
          )}

          <div className="grid sm:grid-cols-3 gap-2 mt-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => {
                  SetCheckIn(e.target.value);
                }}
                placeholder="18:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                }}
                placeholder="11:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuest}
                onChange={(e) => {
                  setMaxGuest(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button className="primary my-2">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
