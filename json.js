const xhr = new XMLHttpRequest();
const url = "data/eat.json";
var output = "";

//////// Iteration

/// Load data with XMLHttpRequest
xhr.addEventListener("load", function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(this.response);
        const Places = JSON.parse(xhr.response);
        console.log(Places); 

        for (let place of Places) {
            output += placeTemplate(place);
        }
        addElement(output); 
    }
    function addElement (data_input) {
        // create a new div element, append it to main
        const newDiv = document.createElement("div");
        newDiv.id = "display";
      
        // and give it some content
        newDiv.insertAdjacentHTML('afterbegin', data_input);
      
        // add the text node to the newly created div
        // newDiv.appendChild(newContent);

      
        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("card_list");
        // document.body.insertBefore(newDiv, currentDiv);
        currentDiv.appendChild(newDiv);
      }
});

xhr.open("GET", url, true);
xhr.send();

function placeTemplate(places){

    let placeObj = new Object();
    placeObj = places; 
    //   console.log(spotObj);

    const isFavorite = isPlaceFavorite(places.id); // Check if the place is a favorite
    const heartClass = isFavorite ? "fa fa-heart" : "far fa-heart"; // Set the heart icon class
    return `
        <div class = "place">
        <div class="heart-name"><h2 class = "place-name">${places.name}</h2><i id="heart-${places.id}" class="${heartClass}" onclick="addOrRemoveFavorite(${places.id})"></i></div>
        <img class = "place-photo" src = "${places.photo}">
        <a class = "btn" onclick="saveSelection(${places.id})">More Info</a>
        </div>`
   
}

// Function to check if a place is a favorite
function isPlaceFavorite(placeId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(placeId);
}

function saveSelection(sel) {
        localStorage.setItem ("selected",sel );
        window.open("details.html", "_self");
}

function showFavorites() {
    window.open("favorites.html", "_self"); 
}

let favorites = [];

function addOrRemoveFavorite(placeId) {
    const heartIcon = document.getElementById(`heart-${placeId}`);
    if (heartIcon.className === "far fa-heart") {
        heartIcon.className = "fa fa-heart";
        addToFavorites(placeId);
    } else {
        heartIcon.className = "far fa-heart";
        removeFromFavorites(placeId);
    }
}

function addToFavorites(placeId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(placeId)) {
        favorites.push(placeId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("Added to favorites:", favorites);
    }
}

// When removing a place from favorites
function removeFromFavorites(placeId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.indexOf(placeId);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("Removed from favorites:", favorites);
    }
}

   
document.getElementById("display").innerHTML =
`<h1 class="title">Top 10 Places to Eat in Rochester</h1>
<a class = "btn1" onclick="showFavorites()">Show Favorites</a>
${output}`;
