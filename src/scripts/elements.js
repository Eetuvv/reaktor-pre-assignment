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
