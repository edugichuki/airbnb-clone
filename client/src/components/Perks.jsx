/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
const Perks = ({ selected, onChange }) => {
  const handleCbClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-3 lg:grid-cols-4">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("wifi")}
            name="wifi"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-house-signal" size="lg" />
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("entrance")}
            name="entrance"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-door-closed" size="lg" />

          <span>Private entrace</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("tv")}
            name="tv"
            onChange={handleCbClick}
          />
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
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>

          <span>Tv</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("pets")}
            name="pets"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-cat" size="lg" />
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("kitchen")}
            name="kitchen"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-kitchen-set" size="lg" />
          <span>kitchen</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("waterfront")}
            name="waterfront"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-up-from-water-pump"
            size="lg"
          />
          <span>waterfront</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("lake-view")}
            name="lake-view"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-up-from-water-pump"
            size="lg"
          />
          <span>Lake view</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("workspace")}
            name="workspace"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-house-laptop" size="lg" />
          <span>Dedicated workspace</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("soap")}
            name="soap"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-pump-soap" size="lg" />
          <span>Cinnabar Green body soap</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("shower")}
            name="shower"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-shower" size="lg" />
          <span>Hot shower</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("handwash")}
            name="handwash"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-spray-can-sparkles" size="lg" />
          <span>Hand wash</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("wine glass")}
            name="wine glass"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-champagne-glasses" size="lg" />
          <span>Wine glasses</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("radio")}
            name="radio"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-radio" size="lg" />
          <span>Radio</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("parking")}
            name="parking"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-warehouse" size="lg" />
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("blender")}
            name="blender"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-blender" size="lg" />
          <span>Blender</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("fire")}
            name="fire"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-fire-burner" size="lg" />
          <span>Indoor fireplace: wood-burning</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("coffee")}
            name="coffee"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-mug-hot" size="lg" />
          <span>Brewed coffee</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("aircon")}
            name="aircon"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon
            icon="fa-solid fa-temperature-arrow-down"
            size="lg"
          />
          <span>Air conditioning</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("heat")}
            name="heat"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-temperature-arrow-up" size="lg" />
          <span>Heating</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("woodland")}
            name="woodland"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-tree-city" size="lg" />
          <span>Woodland view</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("pool")}
            name="pool"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-person-swimming" size="lg" />
          <span>Swimming pool</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("books")}
            name="books"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-book" size="lg" />
          <span>Books and reading material</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("spa")}
            name="spa"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-spa" size="lg" />
          <span>Spa</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("smoking")}
            name="smoking"
            onChange={handleCbClick}
          />
          <FontAwesomeIcon icon="fa-solid fa-smoking" size="lg" />
          <span>Smoking allowed</span>
        </label>
      </div>
    </>
  );
};

export default Perks;
