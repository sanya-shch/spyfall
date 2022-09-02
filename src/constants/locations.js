const locations = [
  {
    img: "beach.png",
    title: "Beach",
    id: "beach",
  },
  {
    img: "cinema.png",
    title: "Cinema",
    id: "cinema",
  },
  {
    img: "casino.png",
    title: "Casino",
    id: "casino",
  },
  {
    img: "circus-tent.png",
    title: "Circus Tent",
    id: "circusTent",
  },
  {
    img: "bank.png",
    title: "Bank",
    id: "bank",
  },
  {
    img: "sauna.png",
    title: "Sauna",
    id: "sauna",
  },
  {
    img: "hotel.png",
    title: "Hotel",
    id: "hotel",
  },
  {
    img: "restaurant.png",
    title: "Restaurant",
    id: "restaurant",
  },
  {
    img: "grocery-cart.png",
    title: "Supermarket",
    id: "groceryCart",
  },
  {
    img: "flat-tire.png",
    title: "Service Station",
    id: "flatTire",
  },
  {
    img: "hospital-bed.png",
    title: "Hospital",
    id: "hospital",
  },
  {
    img: "embassy.png",
    title: "Embassy",
    id: "embassy",
  },
  {
    img: "base.png",
    title: "Military Base",
    id: "base",
  },
  {
    img: "police-station.png",
    title: "Police Station",
    id: "policeStation",
  },
  {
    img: "training.png",
    title: "School",
    id: "training",
  },
  {
    img: "graduation.png",
    title: "University",
    id: "graduation",
  },
  {
    img: "plane.png",
    title: "Airplane",
    id: "plane",
  },
  {
    img: "cruise.png",
    title: "Ocean Liner",
    id: "cruise",
  },
  {
    img: "train.png",
    title: "Passenger Train",
    id: "train",
  },
  {
    img: "submarine.png",
    title: "Submarine",
    id: "submarine",
  },
  {
    img: "church.png",
    title: "Church",
    id: "church",
  },
  {
    img: "party-time.png",
    title: "Corporate Party",
    id: "party",
  },
  {
    img: "studio.png",
    title: "Movie Studio",
    id: "studio",
  },
  {
    img: "knight.png",
    title: "Crusader Army",
    id: "knight",
  },
  {
    img: "pirate-ship.png",
    title: "Pirate Ship",
    id: "pirate",
  },
  // {
  //     img: "polar-bear.png",
  //     title: "Polar Station",
  // },
  // {
  //     img: "arctic.png",
  //     title: "Arctic station",
  // },
  {
    img: "arctic.png",
    title: "Polar Station",
    id: "arctic",
  },
  {
    img: "space-tourism.png",
    title: "Space Station",
    id: "space",
  },
  {
    img: "moon.png",
    title: "Moon",
    id: "moon",
  },
  {
    img: "castle.png",
    title: "Castle",
    id: "castle",
  },
  {
    img: "fire-station.png",
    title: "Fire Station",
    id: "fireStation",
  },
  {
    img: "neighborhood.png",
    title: "Street",
    id: "neighborhood",
  },
  {
    img: "bus-stop.png",
    title: "Bus stop",
    id: "bus",
  },
  {
    img: "park.png",
    title: "Park",
    id: "park",
  },
  {
    img: "library.png",
    title: "Library",
    id: "library",
  },
  // {
  //     img: "fencing.png",
  //     title: "Museum",
  // },
  {
    img: "museum.png",
    title: "Museum of Art",
    id: "museum",
  },
  {
    img: "carousel.png",
    title: "Amusement Park",
    id: "carousel",
  },
  {
    img: "sweets.png",
    title: "Sweets factory",
    id: "sweets",
  },
  {
    img: "contest.png",
    title: "Exhibition of animals",
    id: "contest",
  },
  {
    img: "cemetery.png",
    title: "Cemetery",
    id: "cemetery",
  },
  {
    img: "pickaxe.png",
    title: "Coalmine",
    id: "pickaxe",
  },
  {
    img: "building.png",
    title: "Construction site",
    id: "building",
  },
  {
    img: "gas-station.png",
    title: "Gas station",
    id: "gas",
  },
  {
    img: "port.png",
    title: "Port",
    id: "port",
  },
  {
    img: "ice-skating.png",
    title: "Ice-skating Rink",
    id: "ice",
  },
  {
    img: "prisoner.png",
    title: "Prison",
    id: "prisoner",
  },
  {
    img: "racing.png",
    title: "Car Racing",
    id: "racing",
  },
  {
    img: "everest.png",
    title: "Mount Everest",
    id: "everest",
  },
  {
    img: "nursing-home.png",
    title: "Nursing Home",
    id: "nursingHome",
  },
  {
    img: "rock.png",
    title: "Rock Concert",
    id: "rock",
  },
  {
    img: "excursion.png",
    title: "Excursion Bus",
    id: "excursion",
  },
  {
    img: "stadium.png",
    title: "Stadium",
    id: "stadium",
  },
  {
    img: "kiev-metro-logo.png",
    title: "Underground",
    id: "metro",
  },
  {
    img: "wedding.png",
    title: "Wedding",
    id: "wedding",
  },
  {
    img: "forest.png",
    title: "Forest",
    id: "forest",
  },
  {
    img: "north-korea.png",
    title: "North Korea",
    id: "northKorea",
  },
  {
    img: "zoo.png",
    title: "Zoo",
    id: "zoo",
  },
  {
    img: "pub.png",
    title: "Pub",
    id: "pub",
  },
  {
    img: "workout.png",
    title: "Gym",
    id: "workout",
  },
  {
    img: "jewellery.png",
    title: "Jewellery Shop",
    id: "jewellery",
  },
  {
    img: "pet-shop.png",
    title: "Pet Shop",
    id: "pet",
  },
  {
    img: "volcano.png",
    title: "Volcano",
    id: "volcano",
  },
  {
    img: "brazilian.png",
    title: "Carnival",
    id: "brazilian",
  },
  {
    img: "skyscrapers.png",
    title: "Skyscraper",
    id: "skyscrapers",
  },
  {
    img: "post-office.png",
    title: "Post Office",
    id: "postOffice",
  },
  {
    img: "swimming-pool.png",
    title: "Swimming Pool",
    id: "swimmingPool",
  },
  {
    img: "aquarium.png",
    title: "Aquarium",
    id: "aquarium",
  },
];

export default locations;
