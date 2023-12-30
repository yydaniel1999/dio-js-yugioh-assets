const states = {
  score: {
    player: 0,
    enemy: 0,
  },
  view: {
    score: document.querySelector(".player-score"),
    cardSelected: {
      picture: document.querySelector(".card__picture"),
      name: document.querySelector(".card__name"),
      type: document.querySelector(".card__type"),
    },
    fieldCard: {
      player: document.querySelector(".card-infield__player"),
      enemy: document.querySelector(".card-infield__enemy"),
    },
    cardBox: {
      player: document.querySelector(".card-box--player"),
      enemy: document.querySelector(".card-box--enemy"),
    },
  },
  actions: {
    duelButton: document.querySelector(".next-duel"),
  },
};

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    image: "./assets/icons/dragon.png",
    winOf: [1],
    loseOf: [2],
  },
  {
    id: 1,
    name: "Black Magician",
    type: "Rock",
    image: "./assets/icons/magician.png",
    winOf: [2],
    loseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    image: "./assets/icons/exodia.png",
    winOf: [0],
    loseOf: [1],
  },
];
