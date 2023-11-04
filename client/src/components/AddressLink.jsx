/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddressLink = ({ children, className = null }) => {
  if (className) {
    className = "flex my-2";
  }
  className += "gap-1  font-semibold underline";
  return (
    <>
      <a
        className={className}
        target="_blank"
        href={"https://www.google.com/maps/place/" + children}
        rel="noreferrer"
      >
        <FontAwesomeIcon icon="fa-solid fa-location-dot" size="lg" />
        {children}
      </a>
    </>
  );
};

export default AddressLink;
