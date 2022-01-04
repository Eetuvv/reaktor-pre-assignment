// Store all data from games here
const gameData = [];
// Fetch Reaktor's API
function fetchAPI() {
  // send request through cors anywhere proxy to bypass cors-error
  const url =
    "https://lit-earth-87378.herokuapp.com/https://bad-api-assignment.reaktor.com";
  const page = "/rps/history";
  collectData(url, page);
}

async function fetchPages(url, page) {
  const res = await fetch(url + page);
  const data = await res.json();

  return data;
}

// Store data from JSON files
function collectData(url, page) {
  // Fetch all pages recursively
  try {
    fetchPages(url, page).then((data) => {
      gameData.push(data.data);
      page = data.cursor;
      collectData(url, page);
    });
  } catch (err) {
    return "No more pages";
  } finally {
    extractData(gameData);
    updatePlayerCells();
  }
}

// Extract game details from stored data
function extractData(data) {
  for (let i = 0; i < data.length; i++) {
    game = data[i][0];
    const aName = game.playerA.name;
    const bName = game.playerB.name;
    const aPlayed = game.playerA.played;
    const bPlayed = game.playerB.played;
    const gameId = game.gameId;
    const winner = getWinner(aName, aPlayed, bName, bPlayed);

    const result = new GameResult(
      aName,
      aPlayed,
      bName,
      bPlayed,
      gameId,
      winner
    );
    // Add game result to results array
    addResult(result);
    // Add player data to players array
    addPlayerData(result);
  }
}

fetchAPI();

// Create WebSocket connection for live games
const socket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

// Listen for live games
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);

  let data = event.data.split(",");
  let gameId = data[1].split(":");
  // Strip backaslashes and quotes
  gameId = gameId[1].split(",").join().replace(/\\"/g, "");
  // Game type: GAME_BEGIN or GAME_RESULT
  const type = data[0]
    .split(":")[1]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");

  // The API gives different data based on type of result
  // Split data according to the result
  if (type === "GAME_BEGIN") {
    splitLive(data, gameId);
  } else if (type === "GAME_RESULT") {
    splitResult(data, gameId);
  }
});

// Game type: GAME_BEGIN
function splitLive(data, gameId) {
  playerA = data[2].split(":");
  playerB = data[3].split(":");

  aName = playerA[2]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");
  bName = playerB[2]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");

  const result = new GameResult(aName, null, bName, null, gameId, null);
  addLiveGame(result);
}

// Game type: GAME_RESULT
function splitResult(data, gameId) {
  playerA = data[3].split(":");
  aPlayed = data[4].split(":");

  playerB = data[5].split(":");
  bPlayed = data[6].split(":");

  aName = playerA[2]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");

  aPlayed = aPlayed[1]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");

  bName = playerB[2]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");

  bPlayed = bPlayed[1]
    .split(",")
    .join()
    .replace(/["\\{}]/g, "");

  const winner = getWinner(aName, aPlayed, bName, bPlayed);
  const result = new GameResult(aName, aPlayed, bName, bPlayed, gameId, winner);
  // Delete game from live games table (since the game has ended, it's no longer live)
  deleteLiveGame(result);
  // Add game result to recent games
  addRecent(result);
  // Add game result to results array (containing all games)
  addResult(result);
}
