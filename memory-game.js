"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  let tempCount = 0;
  let arr = []; // array to keep track of clicked cards
  let lockCards = 0; // number of cards clicked tracker
  let winner = []; // array to keep track of unique cards that have been matched 
  for (let color of colors) {
    let card = document.createElement("div");
    card.innerText = color;
    card.id = (tempCount += 1);
    card.style.color = "olive";
    card.classList.add("back");

      card.addEventListener("click", function(){
        if(lockCards < 2){ 
          flipCard(card, color, arr, lockCards, winner);
          lockCards += 1;
        } if(lockCards >= 2){
          const myTimeout3 = setTimeout(function(){
            lockCards = 0;
          }, 1000, lockCards);
        }       
      });
    gameBoard.appendChild(card);
  }

}


/** Flip a card face-up. */


function flipCard(card, color, arr, lockCards, winner) {
  arr.push(card);
  handleCardClick(card, color);
  /* check to see if card has been clicked by checking list of winners  */
  if(winner.includes(card.id)){
    if(arr.length === 2){
      arr.pop();
      arr.pop();
      return;
      
    } else{
      arr.pop();
      return;
    }
  }
  /* condition: if 2 cards have been flipped, check to see if same card was clicked */
  if(arr.length === 2) {
    if(arr[0].id === (arr[1].id)){
      unFlipCard(card);
      arr.pop();
      arr.pop();
      
      return;
    } 
    /* if 2 cards do not match */
    if(arr[0].innerText != arr[1].innerText){
      if(winner.includes(arr[1].id)){
        arr.pop();
      }
      if(winner.includes(arr[0].id)){
        arr.pop();
      } else {
        const myTimeout = setTimeout(unFlipCard, 1000, arr[0]);
        const myTimeout2 = setTimeout(unFlipCard, 1000, arr[1]);
        arr.pop();
        arr.pop();
        return;
      }
    } 
    /* if cards match and have not been matched before */
    if(arr[0].innerText === arr[1].innerText && !winner.includes(arr[0].id) && !winner.includes(arr[1].id)){
      winner.push(arr[0].id);
      winner.push(arr[1].id);
      arr.pop();
      arr.pop();
      if(winner.length === 10){
        alert("Winner Winner!");
      }
      return;
    }
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.setAttribute("class", "back");
  card.style.color = "olive";
  
  
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(card, color) {
  card.setAttribute("class", color);
  card.style.color = color;
}
