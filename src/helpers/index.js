import locations from "../constants/locations";

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const getLocationsData = (num) =>
  getMultipleRandom(locations, num).map((item) => ({
    id: item.id,
    title: item.title,
  }));

const getRandomLocation = (locationsData) => {
  const mapSize = locationsData.length;
  const locationIndex = Math.floor(Math.random() * mapSize);

  return locationsData[locationIndex];
};

export const getRandomLocationsData = (num) => {
  const locationsList = getLocationsData(num);
  const location = getRandomLocation(locationsList);

  return { location, locationsList };
};
