// VARIABLES
const filterInput = document.querySelector("#filter-input");

// FUNCTIONS
function filterNames(e) {
  // Get search input
  const filterValue = document
    .querySelector("#filter-input")
    .value.toLowerCase();

  // Get names list and collection of names
  const contactList = document.querySelector("#names");
  const contacts = contactList.querySelectorAll("li.collection-item");

  // Loop through collection item
  for (const contact of contacts) {
    const name = contact.getElementsByTagName("a")[0].innerHTML.toLowerCase();

    if (name.includes(filterValue)) {
      contact.hidden = false;
    } else {
      contact.hidden = true;
    }
  }
}

// EVENT LISTENERS
filterInput.addEventListener("keyup", filterNames);
