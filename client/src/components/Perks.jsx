import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
const Perks = ({ selected, onChange }) => {
  const handleCbClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      // eslint-disable-next-line react/prop-types
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-3 lg:grid-cols-4">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="wifi" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-house-signal" size="lg" />
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="entrance" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-door-closed" size="lg" />

          <span>Private entrace</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="tv" onChange={handleCbClick} />
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
          <input type="checkbox" name="pets" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-cat" size="lg" />
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="kitchen" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-kitchen-set" size="lg" />
          <span>kitchen</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="waterfront" onChange={handleCbClick} />
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-up-from-water-pump"
            size="lg"
          />
          <span>waterfront</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="lake-view" onChange={handleCbClick} />
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-up-from-water-pump"
            size="lg"
          />
          <span>Lake view</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="workspace" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-house-laptop" size="lg" />
          <span>Dedicated workspace</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="soap" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-pump-soap" size="lg" />
          <span>Cinnabar Green body soap</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="shower" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-shower" size="lg" />
          <span>Hot shower</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="handwash" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-spray-can-sparkles" size="lg" />
          <span>Hand wash</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="wine glass" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-champagne-glasses" size="lg" />
          <span>Wine glasses</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="radio" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-radio" size="lg" />
          <span>Radio</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="parking" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-warehouse" size="lg" />
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="blender" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-blender" size="lg" />
          <span>Blender</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="fire" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-fire-burner" size="lg" />
          <span>Indoor fireplace: wood-burning</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="coffee" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-mug-hot" size="lg" />
          <span>Brewed coffee</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="aircon" onChange={handleCbClick} />
          <FontAwesomeIcon
            icon="fa-solid fa-temperature-arrow-down"
            size="lg"
          />
          <span>Air conditioning</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="heat" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-temperature-arrow-up" size="lg" />
          <span>Heating</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="woodland" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-tree-city" size="lg" />
          <span>Woodland view</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="pool" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-person-swimming" size="lg" />
          <span>Swimming pool</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="books" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-book" size="lg" />
          <span>Books and reading material</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="spa" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-spa" size="lg" />
          <span>Spa</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="smoking" onChange={handleCbClick} />
          <FontAwesomeIcon icon="fa-solid fa-smoking" size="lg" />
          <span>Smoking allowed</span>
        </label>
      </div>
    </>
  );
};

export default Perks;
