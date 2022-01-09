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
  // List all games that player has played
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
    // Calculates which selection player has chosen the most
    // rock, paper or scissors
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

  // Calculate win rate (wins / total games)
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
    const player = players.find((p) => p.name === name);
    player.addGame(res);

    // Add a win, loss or draw depending on result
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

  // Check if player won, lost or if result was draw
  // Add result to player's statistics
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
  // Tests for a match (any matching character; not the best search function)
  matches = players.filter((item) => regex.test(item.name));

  addMatchingPlayers();

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
    // Show only first 10 matches for faster performance
    if (matches.length > 10) {
      matchesAmount = 10;
      title.textContent =
        "Showing first " +
        matchesAmount +
        " matches out of " +
        matches.length +
        ' matches for search term "' +
        searchTerm +
        '"';
    } else {
      title.textContent = 'Matches for search term "' + searchTerm + '"';
    }
    // Loop through first 10 matches only
    for (let i = 0; i < matchesAmount; i++) {
      const player = matches[i];
      const name = player.name;
      const total = player.total;
      const won = player.won;
      const lost = player.lost;
      const draws = player.draws;
      const winrate = player.winrate();
      const mostSelected = player.getMostSelected();

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

        btn.setAttribute("type", "button");
        btn.setAttribute("style", "color:white");
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target", "#" + splittedName + "-modal");
        btn.textContent = "Click for more info";
        //When user clicks 'more info' button, create a modal to show all games player has played
        btn.onclick = () => createModal(name);
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
  const player = players.find((p) => p.name === name);
  const games = player.listAllGames();

  let modals = document.getElementById("modals-div");
  id = splitName(name) + "-modal";
  let modal = document.getElementById(id);

  if (modal != null) {
    // Remove old modal if it exists
    modal = modal.remove();
  }
  modal = document.createElement("div");

  modal.id = id;
  modal.classList.add("modal", "fade");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("data-backdrop", "true");

  let modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  modalDialog.setAttribute("role", "document");

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  let modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header", "text-center");
  modalHeader.style.textAlign = "center";

  // Create a title for modal
  let modalTitle = document.createElement("h5");

  let nameTitle = document.createElement("h2");
  nameTitle.textContent = name + "'s games";

  const amountTitle = document.createElement("h4");
  // Sub-title in player's modal containing game history
  // Shows amount of games in total. Save ID to update it later
  amountTitleId = splitName(name) + "-amountTitle";
  amountTitle.id = amountTitleId;
  amountTitle.textContent = "Total amount of games: " + player.total;

  modalTitle.appendChild(nameTitle);
  modalTitle.appendChild(amountTitle);
  modalTitle.classList.add("modal-title", "w-100");

  let closeBtn = document.createElement("p");
  closeBtn.setAttribute("type", "button");
  closeBtn.classList.add("btn", "btn-close");
  closeBtn.setAttribute("data-dismiss", "modal");
  closeBtn.setAttribute("aria-label", "Close");

  modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // Create table with game results
  // Returns table, table id and table body id in array
  tableContent = createModalTable(games, name);

  const table = tableContent[0];
  const tableId = tableContent[1];
  const tBodyId = tableContent[2];

  modalBody.appendChild(table);

  let modalFooter = document.createElement("div");

  let selectionBtn = document.createElement("select");
  selectionBtn.classList.add("form-select");
  selectionBtn.innerHTML = `
  <option selected value="100">100 games (default)</option>
  <option value="200">200 games</option>
  <option value="500">500 games</option>
  <option value="1000">1000 games</option>
  <option value="2000">2000 games</option>
  <option value="All">All games</option>
  `;
  selectionBtn.setAttribute(
    "style",
    "width: 50%; margin-left: 5px; margin-top: 10px; width: 40%;"
  );

  // Updates modal table contents (list of all player's games)
  selectionBtn.onchange = () =>
    updateModalTable(
      games,
      tableId,
      tBodyId,
      amountTitleId,
      selectionBtn.value
    );

  modalFooter.appendChild(selectionBtn);

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeBtn);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modalDialog.appendChild(modalBody);
  modal.appendChild(modalDialog);
  modals.appendChild(modal);
}

function createModalTable(games, name) {
  // Create table for modal
  name = splitName(name);
  const tableId = name + "-table";
  const tBodyId = name + "-tBody";
  let table = document.getElementById(tableId);

  // If table exists, remove it and create a new on to keep items up-to-date
  if (table != null) {
    table = table.remove();
  }
  table = document.createElement("table");
  table.id = name + "-table";
  table.classList.add("table", "table-striped", "table-hover");

  const tHead = document.createElement("thead");
  tHead.classList.add("table-dark", "table-hover");
  tHead.scope = "col";

  columns = document.createElement("tr");

  cols = [
    "#",
    "Winner",
    "Player A",
    "Selection",
    "Player B",
    "Selection",
    "Game ID",
  ];

  // Create header cells for table
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

  tBody.id = tBodyId;

  // Loop through games a player has played and add game info to table row
  // Limit to show only 100 games first

  let gameAmount = games.length;
  if (games.length > 100) {
    gameAmount = 100;
  }
  for (let i = 0; i < gameAmount; i++) {
    const game = games[i];

    // Count number of games played
    counter = i + 1;
    const aName = game.aName;
    const aPlayed = game.aPlayed;
    const bName = game.bName;
    const bPlayed = game.bPlayed;
    const winner = game.winner;
    const gameId = game.gameId;

    const row = document.createElement("tr");

    properties = [counter, winner, aName, aPlayed, bName, bPlayed, gameId];

    for (let j = 0; j < properties.length; j++) {
      let cell = document.createElement("td");

      cell.innerHTML = properties[j];
      row.appendChild(cell);
    }
    tBody.appendChild(row);
    table.appendChild(tBody);
  }

  return [table, tableId, tBodyId];
}

// Update games list for each player. (Showing thousands of games results at once is slow)
function updateModalTable(games, table, tBody, amountTitle, val) {
  // Val = selection box value
  if (val === "All" || val > games.length) {
    val = games.length;
  }

  table = document.getElementById(table);
  tBody = document.getElementById(tBody);
  // Clear table body to append new values
  tBody.innerHTML = "";

  for (let i = 0; i < val; i++) {
    const game = games[i];

    // Count number of games played
    counter = i + 1;
    const aName = game.aName;
    const aPlayed = game.aPlayed;
    const bName = game.bName;
    const bPlayed = game.bPlayed;
    const winner = game.winner;
    const gameId = game.gameId;

    const row = document.createElement("tr");

    properties = [counter, winner, aName, aPlayed, bName, bPlayed, gameId];

    for (let j = 0; j < properties.length; j++) {
      let cell = document.createElement("td");

      cell.innerHTML = properties[j];
      row.appendChild(cell);
    }
    tBody.appendChild(row);
  }
  table.appendChild(tBody);

  // Update title that shows total amount of games a player has played
  amountTitle = document.getElementById(amountTitle);
  amountTitle.textContent = "Total amount of games: " + games.length;
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
