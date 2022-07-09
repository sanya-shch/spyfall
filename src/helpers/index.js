import locations from "../constants/locations";

export const getLocationData = () => {
  const location = getRandomLocation();

  return location;
};

const getRandomLocation = () => {
  const mapSize = locations.length;
  const locationIndex = Math.floor(Math.random() * mapSize);

  return locations[locationIndex];
};
