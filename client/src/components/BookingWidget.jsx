import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

/* eslint-disable react/prop-types */
const BookingWidget = ({ place = { place } }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const bookThisPlace = async () => {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phoneNumber,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div>
        <div className="bg-white shadow rounded-2xl p-4">
          <div className="text-2xl text-center">
            Price: <span className="font-semibold">${place.price}</span> / night
          </div>
          <div className="mt-4 border rounded-2xl">
            <div className="flex">
              <div className="py-3 px-4">
                <label>Check in: </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="py-3 px-4 border-l">
                <label>Check out: </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
            <div className="py-3 px-4 border-t">
              <label>Number of guests</label>
              <input
                type="number"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
            {numberOfNights > 0 && (
              <div className="py-3 px-4 border-t">
                <label>Your full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Phone number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}
          </div>

          <button onClick={bookThisPlace} className="primary mt-4">
            Reserve
            {numberOfNights > 0 && (
              <span> ${numberOfNights * place.price}</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingWidget;
