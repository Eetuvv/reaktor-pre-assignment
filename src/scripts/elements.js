// function smallerSideBar() {
//   // Set side-bar elements to make it smaller and change position to fixed so that it stays in place
//   document
//     .getElementById("side-bar")
//     .setAttribute("style", "width:35%; position: fixed; margin-left: 0%;");

//   // Set font sizes
//   document
//     .getElementById("live-cols")
//     .setAttribute("style", "font-size: 18px;");
//   document
//     .getElementById("live-header")
//     .setAttribute("style", "font-size: 30px;");
// }
// function largerSideBar() {
//   // Set side-bar elements to make it larger and change position to absolute so that it's scrollable
//   document
//     .getElementById("side-bar")
//     .setAttribute("style", "width:65%; position: absolute; margin-left: 2%;");

//   // Set font sizes
//   document
//     .getElementById("live-cols")
//     .setAttribute("style", "font-size: 21px;");
//   document
//     .getElementById("live-header")
//     .setAttribute("style", "font-size: 30px;");
// }

/*// Set action when history-button is clicked
function showPastGames() {
  // Remove all active and disabled classes from nav items
  $(".navbar-nav").find(".active").removeClass("active");
  $(".navbar-nav").find(".disabled").removeClass("disabled");
  // Disable this nav item and set it to active
  $("#nav-past").addClass("active");
  $("#nav-past").addClass("disabled");

  // Show history page and hide others
  $("#past-games-div").show();
  $("#all-players-div").hide();
  $("#search-players-div").hide();

  // Clear search form
  document.getElementById("search-input").value = "";
  smallerSideBar();
}
// Set action when home-button is clicked
function showHome() {
  // Remove all active and disabled classes from nav items
  $(".navbar-nav").find(".active").removeClass("active");
  $(".navbar-nav").find(".disabled").removeClass("disabled");

  // Disable this nav item and set it to active
  $("#nav-home").addClass("active");
  $("#nav-home").addClass("disabled");

  // Hide other divs
  $("#past-games-div").hide();
  $("#all-players-div").hide();
  $("#search-players-div").hide();

  largerSideBar();
  // Clear search form
  document.getElementById("search-input").value = "";
}

function showAllPlayers() {
  $(".navbar-nav").find(".active").removeClass("active");
  $(".navbar-nav").find(".disabled").removeClass("disabled");
  // Disable this nav item and set it to active
  $("#nav-all-players").addClass("active");
  $("#nav-all-players").addClass("disabled");

  updatePlayerCells();
  // Show all players div and hide others
  $("#all-players-div").show();
  $("#past-games-div").hide();
  $("#search-players-div").hide();

  smallerSideBar();
  // Clear search form
  document.getElementById("search-input").value = "";
}*/
function showSearchResults() {
  if ($("#search-players-div").hasClass("active")) {
    $("#search-players-div").show();
  } else {
    $("#search-players-div").toggle(100);
  }
  $("#search-players-div").addClass("active");
  // Set side-bar elements to make it smaller and change position to fixed so that it stays in place
  document
    .getElementById("side-bar")
    .setAttribute("style", "width:35%; position: fixed; margin-left: 0%;");
  updatePlayerCells();
}

function closeSearchResults() {
  $("#search-players-div").removeClass("active");
  $("#search-players-div").toggle(100);
  // Set side-bar elements to make it larger and change position to absolute so that it's scrollable
  document
    .getElementById("side-bar")
    .setAttribute("style", "width:65%; position: absolute; margin-left: 2%;");
}

// Top button that scrolls to top when clicked
let topButton = document.getElementById("topButton");

// When the user scrolls down 30px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Set enter button functionality to hit search button on enter press
// Get the input field
let searchInput = document.getElementById("search-input");

// Execute a function when the user releases a key on the keyboard
searchInput.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});
