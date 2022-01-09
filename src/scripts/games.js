class GameResult {
  constructor(aName, aPlayed, bName, bPlayed, gameId, winner) {
    this.aName = aName;
    this.aPlayed = aPlayed;
    this.bName = bName;
    this.bPlayed = bPlayed;
    this.gameId = gameId;
    this.winner = winner;
  }
}

// Save all results from games that have ended in here
const results = [];
// Save only recent games here
const recentGames = [];
// Save live games here
const liveGames = [];

// Adds a new game result to array of objects
function addResult(result) {
  results.push(result);
}

// Implementing recent games -table results this way to keep them up-to-date
// Has to loop through all array items each time but its not too taxing since the array is very small
function updateRecentResults() {
  const table = document.getElementById("recent-body");
  // Reset table before updating
  table.innerHTML = "";

  // Cycle through recent results
  for (let i = 0; i < recentGames.length; i++) {
    let result = recentGames[i];

    const aName = result.aName;
    const aPlayed = result.aPlayed;
    const bName = result.bName;
    const bPlayed = result.bPlayed;
    const winner = result.winner;
    // Keep track of how many games there are
    let counter = i + 1;

    // Create row element to append cells to
    let row = document.createElement("tr");

    // Set row id to game ID so that it can be modified later using that same id
    row.id = result.gameId;

    // Loop through properties
    const properties = [counter, winner, aName, aPlayed, bName, bPlayed];

    for (let j = 0; j < properties.length; j++) {
      let cell = document.createElement("td");
      cell.innerHTML = properties[j];

      row.appendChild(cell);
    }

    // Add new row to table
    table.appendChild(row);
  }
}

// Implementing live games -table results this way to keep them up-to-date
// Has to loop through all array items each time but its not too taxing since the array is very small
function updateLiveGames() {
  const table = document.getElementById("live-body");
  // Reset table before updating
  table.innerHTML = "";

  // Cycle through live games
  for (let i = 0; i < liveGames.length; i++) {
    const result = liveGames[i];
    // Get properties from GameResult-object
    const aName = result.aName;
    const bName = result.bName;
    const gameId = result.gameId;
    let count = i + 1;

    let row = document.createElement("tr");
    row.classList.add("live-table-items");
    row.id = "live-items";

    // Set row id to game ID so that it can be modified later using that same id
    row.id = gameId;

    let properties = [count, aName, bName];

    for (let j = 0; j < properties.length; j++) {
      let cell = document.createElement("td");
      cell.innerHTML = properties[j];

      row.appendChild(cell);
    }

    table.appendChild(row);

    // Add new row to table
    table.appendChild(row);
  }
}

function addRecent(result) {
  // Keep track of 5 recent games only
  if (recentGames.length == 5) {
    recentGames.shift();
  }
  recentGames.push(result);
  updateRecentResults();
}

function addLiveGame(result) {
  liveGames.push(result);
  updateLiveGames();
}

// Removes game from live games after it has ended. (When type is GAME_RESULT)
function deleteLiveGame(result) {
  const gameId = result.gameId;
  // Try to remove live row from table if it exists
  try {
    document.getElementById(gameId).remove();
    // Remove live game from array (check that gameId matches)
    liveGames.forEach((game, index) => {
      if (game.gameId === gameId) {
        liveGames.splice(index, 1);
      }
      updateLiveGames();
    });
  } catch (err) {
    return "Game not live";
  }
}

// Returns the winner of rock-paper-scissors game
function getWinner(aName, aPlayed, bName, bPlayed) {
  const a = aPlayed;
  const b = bPlayed;
  let winner;
  // scissors wins
  if (a === "SCISSORS" && b === "PAPER") {
    winner = aName;
  } else if (b === "SCISSORS" && a === "PAPER") {
    winner = bName;
  }
  // paper wins
  else if (a === "ROCK" && b === "PAPER") {
    winner = bName;
  } else if (b === "ROCK" && a === "PAPER") {
    winner = aName;
  }
  // rock wins
  else if (a === "ROCK" && b === "SCISSORS") {
    winner = aName;
  } else if (b === "ROCK" && a === "SCISSORS") {
    winner = bName;
  }
  // draw
  else {
    winner = "Draw";
  }

  return winner;
}
