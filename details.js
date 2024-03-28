const xhr = new XMLHttpRequest();
const url = "data/eat.json";
let output = "";

xhr.addEventListener("load", function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const Places = JSON.parse(xhr.responseText);
        const selectedID = localStorage.getItem('selected');
        console.log(selectedID);
        for (let place of Places) {
            if (selectedID == place.id) {
                output = placeTemplate(place);
                console.log("what spot is this " + place.id + place.name);
                addElement(output);
            } 
        }
        function addElement (data_input) {
            // create a new div element, append it to main
            const newDiv = document.createElement("div");
            newDiv.id = "display";
            newDiv.insertAdjacentHTML('afterbegin', data_input);
          
            const currentDiv = document.getElementById("card_list");
            currentDiv.appendChild(newDiv);
     };
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
 
document.getElementById("display").innerHTML =
`<h1 class="title">More Details</h1>
<a href="start.html" class = "btn2">&#8592;</a>
${output}`;