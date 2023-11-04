/* eslint-disable react/prop-types */
const PlaceImage = ({ place, index = 0, className = null }) => {
  if (!place.photos.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <>
      <img
        className={className}
        src={"http://localhost:8080/uploads/" + place.photos[index]}
        alt=""
      />
    </>
  );
};

export default PlaceImage;

// {place.photos.length > 0 && (
//     <img
//       className="object-cover"
//       src={"http://localhost:8080/uploads/" + place.photos[0]}
//       alt=""
//     />
//   )}
