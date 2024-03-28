const xhr = new XMLHttpRequest();
const url = "data/eat.json";
let output = "";

xhr.addEventListener("load", function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const Places = JSON.parse(xhr.responseText);
        const favorites = localStorage.getItem('favorites') || [];

        function displayFavorites() {
            const favoritesContainer = document.getElementById("favorites-list");
            const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

            // Assuming you have a Places array with place objects
            for (const favoriteId of storedFavorites) {
                const favoritePlace = Places.find(place => place.id === favoriteId);
                if (favoritePlace) {
                    const favoriteHtml = placeTemplate(favoritePlace); // Use your existing template function
                    favoritesContainer.insertAdjacentHTML("beforeend", favoriteHtml);
                }
            }
        }

        // Call the function when the page loads
        displayFavorites();
    }});

xhr.open("GET", url, true);
xhr.send();

function placeTemplate(places){

    return `
       <div class = "place">
       <img class = "place-photo" src = "${places.photo}">
       <h2 class = "place-name">${places.name}</h2>
       <p class = "place-address">Address: ${places.address}</p>
       <p class = "place-rating">Rating: ${places.rating}</p>
       <p class = "place-phone">Phone Number: ${places.phone}</p>

       </div>`
   
}

document.getElementById("favorites-list").innerHTML =
`<h1 class="title">My Favorite Places</h1>
<a href="start.html" class = "btn2">&#8592;</a>
${output}`;