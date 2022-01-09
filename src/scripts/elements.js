// Set search button functionality
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
    .setAttribute(
      "style",
      "width:35%; margin-left: 0%; position: fixed; right: auto; left: auto;"
    );
}
// Set close button functionality (button next to search results)
function closeSearchResults() {
  $("#search-players-div").removeClass("active");
  $("#search-players-div").toggle(100);
  // Set side-bar elements to make it larger and its position to absolute
  document
    .getElementById("side-bar")
    .setAttribute("style", "width:65%; margin-left: 2%; right: 35%; left: 15%");
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
