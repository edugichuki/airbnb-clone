/* eslint-disable react/jsx-key */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import PlaceImage from "../components/PlaceImage";
import AccountNav from "./AccountNav";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <>
      <div>
        <AccountNav />
        <div>
          {bookings.length > 0 &&
            bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="w-48">
                  <PlaceImage place={booking.place} />
                </div>
                <div className="py3 grow pr-3">
                  <h2 className="text-xl">{booking.place.title}</h2>

                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-2 text-sm text-gray-500"
                    />
                    <div className="flex gap-1">
                      <FontAwesomeIcon
                        icon="fa-solid fa-sack-dollar"
                        size="xl"
                      />
                      <span className="text-2xl">
                        Total price: ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
