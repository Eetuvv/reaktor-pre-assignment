class Player {
  constructor(name) {
    this.name = name;
  }
  total = 0;
  won = 0;
  lost = 0;
  draws = 0;
  rock = 0;
  scissors = 0;
  paper = 0;

  games = [];
  // Get all games that the player has played
  get allGames() {
    return this.listAllGames();
  }
  get total() {
    return this.total;
  }
  get won() {
    return this.won;
  }
  get lost() {
    return this.lost;
  }
  get draws() {
    return this.draws;
  }
  // List all games that contain player's name
  listAllGames() {
    return this.games;
  }
  addGame(game) {
    this.games.push(game);
    this.total += 1;
  }

  addWin() {
    this.won += 1;
  }
  addLoss() {
    this.lost += 1;
  }
  addDraw() {
    this.draws += 1;
  }
  addRock() {
    this.rock += 1;
  }
  addPaper() {
    this.paper += 1;
  }
  addScissors() {
    this.scissors += 1;
  }
  getMostSelected() {
    let items = [this.rock, this.scissors, this.paper];
    let indexOfMaxValue = items.reduce(
      (iMax, x, i, items) => (x > items[iMax] ? i : iMax),
      0
    );
    if (indexOfMaxValue === 0) {
      return "Rock";
    } else if (indexOfMaxValue === 1) {
      return "Scissors";
    } else {
      return "Paper";
    }
  }

  // Calculate win rate
  winrate() {
    if (this.won === 0) {
      return 0 + " %";
    } else {
      return Math.round((this.won / this.total) * 100) + " %";
    }
  }
}

// Save player-objects here
const players = [];
// Save search results and search term here (temporarily)
let matches, searchTerm;

function addPlayerData(res) {
  const aName = res.aName;
  const bName = res.bName;

  // Check if player a exists in players array
  if (playerExists(aName)) {
    updatePlayer(aName);
  } else {
    addPlayer(aName, res, "a");
  }
  // Check if player b exists in players array
  if (playerExists(bName)) {
    updatePlayer(bName);
  } else {
    addPlayer(bName, res, "b");
  }
  // Checks if a player with given name exists in players array
  function playerExists(name) {
    return players.some((p) => p.name === name);
  }

  // Updates existing player details
  function updatePlayer(name) {
    id = splitName(name);
    table = document.getElementsByTagName("table");
    const player = players.find((p) => p.name === name);
    player.addGame(res);
    if (res.winner === player.name) {
      player.addWin();
    } else if (res.winner === "Draw") {
      player.addDraw();
    } else {
      player.addLoss();
    }
  }
}

// Adds a new player-object with given name to players list
function addPlayer(name, res, p) {
  const player = new Player(name);
  player.addGame(res);
  console.log("res", res);

  if (res.winner === name) {
    player.addWin();
  } else if (res.winner === "Draw") {
    player.addDraw();
  } else {
    player.addLoss();
  }
  let selection;
  // Check whether it's player a or player b and what is the selection
  if (p === "a") {
    selection = res.aPlayed;
  } else {
    selection = res.bPlayed;
  }

  if (selection === "PAPER") {
    player.addPaper();
  } else if (selection === "ROCK") {
    player.addRock();
  } else {
    player.addScissors();
  }
  players.push(player);
}

// Search function for search button. Returns all players whose name matches the search term
function searchPlayer() {
  searchTerm = document.getElementById("search-input").value;

  // Check for empty input
  if (searchTerm.length === 0) {
    noMatches();

    return;
  }
  // Create a regex object to test for matches
  let regex = new RegExp(searchTerm, "i");
  // let regex = new RegExp('?<![\w\d])abc(?![\w\d]')
  // let regex = new RegExp(`\\b${name}\\b`, "i");

  //let matches = players.filter((item) => regex.test(item.name.toLowerCase())); // Tests for a match.
  matches = players.filter((item) => regex.test(item.name));

  addMatchingPlayers();
  updatePlayerCells();

  if (matches.length === 0) {
    noMatches();
  }
  showSearchResults();
}

// Adds the players that are returned from search function to a table
function addMatchingPlayers() {
  try {
    const table = document.getElementById("search-players-body");
    // Clear table first
    table.innerHTML = "";

    // Set title when searching that goes over the search results
    const title = document.getElementById("match-title");

    matchesAmount = matches.length;
    // Show only first 5 matches for faster performance
    if (matches.length > 5) {
      matchesAmount = 5;
      title.innerHTML =
        "Showing first " +
        matchesAmount +
        " matches out of " +
        matches.length +
        ' matches for search term "' +
        searchTerm +
        '"';
    } else {
      title.innerHTML = 'Matches for search term "' + searchTerm + '"';
    }
    // Loop through first 5 matches only
    for (let i = 0; i < matchesAmount; i++) {
      const player = matches[i];
      const name = player.name;
      const total = player.total;
      const won = player.won;
      const lost = player.lost;
      const draws = player.draws;
      const winrate = player.winrate();
      const mostSelected = player.getMostSelected();
      const gamesList = player.listAllGames();

      // Create row element to append cells to
      let row = document.createElement("tr");
      // Set row id to player's name so it can be accessed later
      row.id = splitName(name);

      // Loop through properties
      const properties = [name, total, won, lost, draws, mostSelected, winrate];

      for (let j = 0; j < properties.length; j++) {
        let cell = document.createElement("td");

        cell.innerHTML = properties[j];

        row.appendChild(cell);
      }

      // Get rid of space in name
      // Id cannot have space so that is why it's splitted
      splittedName = splitName(name);
      // Button that opens a model to show player's games

      let btn = document.getElementById(splittedName + "-button");
      if (btn === null) {
        btn = document.createElement("td");
        btn.id = splittedName + "-button";
        btn = document.createElement("td");
        btn.innerHTML = `
      <button type="button" class="btn" 
      style="color:white"
      data-toggle="modal" 
      data-target="#${splittedName}-modal">
      Click for more info
      </button>`;
        // When user clicks 'more info' button, create a modal to show all games player has played
        btn.setAttribute("onclick", createModal(name));
      }
      row.appendChild(btn);
      // Add new row to table
      table.appendChild(row);
    }
  } catch (err) {
    console.log(err);
  }
}

// If there are no matching search results, execute this function
function noMatches() {
  // clear matches
  matches = "";
  const table = document.getElementById("search-players-body");
  table.innerHTML = "";
  const properties = ["No matches!", "", "", "", "", "", ""];

  let row = document.createElement("tr");
  for (let j = 0; j < properties.length; j++) {
    let cell = document.createElement("td");
    cell.innerHTML = properties[j];

    row.appendChild(cell);
  }
  // Add new row to table
  table.appendChild(row);
}

// Splits name so that it doesn't contain spaces
// because ID's can't contain spaces
// Example: Person Lastname = Person_Lastname
function splitName(name) {
  splitted = name.split(/[ ,]+/);
  splitted = splitted[0] + "_" + splitted[1];
  table = document.getElementById(splitted);
  return splitted;
}

function createModal(name) {
  player = players.find((p) => p.name === name);
  games = player.listAllGames();

  try {
    let modals = document.getElementById("modals-div");
    id = splitName(name) + "-modal";
    let modal = document.getElementById(id);

    if (modal != null) {
      // Remove old modal if it exists
      modal = modal.remove();
    }
    modal = document.createElement("div");

    modal.id = id;
    modal.classList.add("modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("tabindex", "-1");

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.setAttribute("role", "document");

    modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header", "text-center");
    modalHeader.style.textAlign = "center";
    modalTitle = document.createElement("h5");
    modalTitle.innerHTML = `
    <h2>
    ${name}'s games</h2>
    <h4>Total amount of games: ${player.total}</h4>
    `;
    modalTitle.classList.add("modal-title", "w-100");

    closeButton = document.createElement("p");
    closeButton.innerHTML = `
    <button type="button" class="btn btn-close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>`;

    modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    table = createTable(games, name);

    modalBody.appendChild(table);

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalDialog.appendChild(modalContent);
    modalDialog.appendChild(modalBody);
    modal.appendChild(modalDialog);
    modals.appendChild(modal);
  } catch (err) {
    console.log(err);
  }
}

function createTable(games, name) {
  // Create table for modal
  id = splitName(name) + "-modal";
  let table = document.getElementById(id);

  // If table exists, remove it and create a new on to keep items up-to-date
  if (table != null) {
    table = table.remove();
  }
  table = document.createElement("table");
  table.id = splitName(name) + "-modal";
  //const table = document.createElement("table");
  const tHead = document.createElement("thead");

  table.classList.add("table", "table-striped", "table-hover");
  tHead.classList.add("table-dark", "table-hover");
  tHead.scope = "col";

  columns = document.createElement("tr");

  cols = [
    "Winner",
    "Player A",
    "Selection",
    "Player B",
    "Selection",
    "Game ID",
  ];

  for (let j = 0; j < cols.length; j++) {
    th = document.createElement("th");
    th.innerHTML = cols[j];
    columns.appendChild(th);
  }

  tHead.appendChild(columns);
  table.appendChild(tHead);
  table.style.width = "250px";
  tHead.style.width = "250px";

  const tBody = document.createElement("tbody");
  tBody.classList.add("table-dark");

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const aName = game.aName;
    const aPlayed = game.aPlayed;
    const bName = game.bName;
    const bPlayed = game.bPlayed;
    const winner = game.winner;
    const gameId = game.gameId;

    const row = document.createElement("tr");

    properties = [winner, aName, aPlayed, bName, bPlayed, gameId];

    for (let j = 0; j < properties.length; j++) {
      let cell = document.createElement("td");

      cell.innerHTML = properties[j];
      row.appendChild(cell);
    }
    tBody.appendChild(row);
    table.appendChild(tBody);
  }
  return table;
}
// Updates total game statistics for player (win rate, total games etc)
function updatePlayerCells() {
  try {
    //If a modal is open, stop updating search results
    if ($(".modal.show").length > 0) {
      return;
    }
    //Update search results only when search results div is active
    if (!$("#search-players-div").hasClass("active")) {
      return;
    }
    addMatchingPlayers();
  } catch (err) {
    console.log(err);
  }
}
