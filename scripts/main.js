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
    bgm: document.querySelector(".bgm"),
  },
  values: {
    cards: 5,
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

const playSound = (file) => {
  const sound = new Audio(`./assets/audios/${file}.wav`);
  sound.volume = 0.2;
  sound.play();
};

const getRandomCard = async (length) => {
  return Math.floor(Math.random() * length);
};

const removeAllCardEventListener = () => {
  states.view.cardBox.player.querySelectorAll(".card").forEach((card) => {
    card.removeEventListener("pointerdown", handleCardClick);
    card.removeEventListener("mouseover", handleCardMouseOver);
  });
};

const updateScore = () => {
  states.view.score.innerText = `Win:${states.score.player} Lose:${states.score.enemy}`;
};

const showDuelButton = (text) => {
  states.actions.duelButton.innerText = text;
  states.actions.duelButton.style.visibility = "initial";
};

const checkResult = (playerCard, enemyCard) => {
  let result = "draw";

  if (cardData[playerCard].winOf.includes(Number(enemyCard))) {
    result = "win";
    states.score.player++;
  }

  if (cardData[playerCard].loseOf.includes(Number(enemyCard))) {
    result = "lose";
    states.score.enemy++;
  }

  playSound(result);
  showDuelButton(result.toUpperCase());
  updateScore();
};

const setCardsOnField = async (playerCard) => {
  const playerCardId = playerCard.dataset.id;
  playerCard.classList.add("selected");

  const randomCardId = await getRandomCard(states.values.cards);
  const enemyCard = states.view.cardBox.enemy.querySelectorAll(".card")[randomCardId];
  const enemyCardId = enemyCard.dataset.id;
  enemyCard.classList.add("selected");

  states.view.fieldCard.player.src = cardData[playerCardId].image;
  states.view.fieldCard.enemy.src = cardData[enemyCardId].image;

  checkResult(playerCardId, enemyCardId);
};

const handleCardClick = async (e) => {
  removeAllCardEventListener();
  setCardsOnField(e.currentTarget);
};

const handleCardMouseOver = (e) => {
  const cardId = e.currentTarget.dataset.id;
  const cardSelected = cardData[cardId];
  const cardElement = states.view.cardSelected;

  cardElement.picture.src = cardSelected.image;
  cardElement.name.innerText = cardSelected.name;
  cardElement.type.innerText = cardSelected.type;
};

const createCard = (id) => {
  const card = document.createElement("img");
  card.src = cardData[id].image;
  card.alt = cardData[id].name;
  card.className = "card";
  card.setAttribute("data-id", id);

  return card;
};

const drawCards = async (cards, fieldSide) => {
  for (let i = 0; i < cards; i++) {
    const randomCardId = await getRandomCard(cardData.length);
    const drawCard = createCard(randomCardId);

    if (fieldSide === "player") {
      drawCard.addEventListener("pointerdown", handleCardClick);
      drawCard.addEventListener("mouseover", handleCardMouseOver);
    }

    states.view.cardBox[fieldSide].appendChild(drawCard);
  }
};

const resetGame = () => {
  document.querySelectorAll(".card").forEach((card) => card.remove());

  const cardElement = states.view.cardSelected;
  cardElement.picture.src = "";
  cardElement.name.innerText = "Selecione uma carta";
  cardElement.type.innerText = "";

  const fieldCards = states.view.fieldCard;
  fieldCards.player.src = "";
  fieldCards.enemy.src = "";

  states.actions.duelButton.style.visibility = "hidden";

  init();
};

const init = () => {
  const bgm = states.view.bgm;
  bgm.play();
  bgm.volume = 0.2;

  drawCards(states.values.cards, "player");
  drawCards(states.values.cards, "enemy");
};

states.actions.duelButton.addEventListener("pointerdown", resetGame);
