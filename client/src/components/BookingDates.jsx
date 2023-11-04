/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { differenceInCalendarDays, format } from "date-fns";

const BookingDates = ({ booking, className }) => {
  return (
    <>
      <div className={"flex gap-1 " + className}>
        <FontAwesomeIcon
          className="text-gray-800"
          icon="fa-solid fa-moon"
          size="lg"
        />
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}
        nights:
        <div className="flex gap-1 items-center ml-2">
          <FontAwesomeIcon
            className="text-gray-800"
            icon="fa-solid fa-calendar-day"
            size="lg"
          />
          {format(new Date(booking.checkIn), "do MMM yyyy")}
        </div>
        &rarr;
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon
            className="text-gray-800"
            icon="fa-solid fa-calendar-day"
            size="lg"
          />
          {format(new Date(booking.checkOut), "do MMM yyyy")}
        </div>
      </div>
    </>
  );
};

export default BookingDates;
