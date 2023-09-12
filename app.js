// PART 1 ========================================================
function getNumFact(num) {
  return axios.get(`http://numbersapi.com/${num}?json`);
}

//================= Solution to #1 =================

getNumFact(14).then((response) => {
  $("#1-fav-num").append(response.data.text);
});

//================= Solution to #2 =================

function getBatchNumFacts() {
  return axios.get(`http://numbersapi.com/1..5`);
}

getBatchNumFacts().then((response) => {
  let data = response.data;
  for (i = 1; i < 6; i++) {
    $("#2").append(`<li>${data[i]}</li>`);
  }
});

//================= Solution to #3 =================
for (i = 0; i < 4; i++) {
  getNumFact(14).then((response) => {
    $("#3-fav-num").append(`<li>${response.data.text}</li>`);
  });
}

// PART 2 ========================================================

//================= Solution to #1 =================

function shuffleDeck() {
  return axios.get(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
  );
}

shuffleDeck()
  .then((response) => {
    // console.log(response);
    let deck_id = response.data.deck_id;
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
  })
  .then((response) => {
    // console.log(response);
    let cards = response.data.cards;
    cards.forEach((card) => {
      console.log(card.value, "of", card.suit);
      $("#card_container").append(`<p>${card.value} of ${card.suit}</p>`);
    });
  });

//================= Solution to #2 =================
cardsArr = [];

shuffleDeck()
  .then((response) => {
    let deck_id = response.data.deck_id;
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
  })
  .then((response) => {
    let card = response.data.cards[0];
    cardsArr.push(card);
    let deck_id = response.data.deck_id;
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
  })
  .then((response) => {
    let card = response.data.cards[0];
    cardsArr.push(card);
    console.log(cardsArr);

    cardsArr.forEach((card) => {
      console.log(card.value, "of", card.suit);
      $("#second_card_container").append(`<p>${card.value} of ${card.suit}</p>`);
    });
  });
