// Write your helper functions here!
require('isomorphic-fetch');


// Top Mission Destination info holder for planets
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    console.log(document.getElementById("missionTarget"))
    let missionTarget = document.getElementById("missionTarget")
    missionTarget.innerHTML = `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `;
    
                 
 }


 function validateInput(testInput) {
    if(typeof testInput == 'number' ){
        return "Is a Number";

    } else if(isNaN(testInput) === true){
        return "Not a Number";
    } else if (testInput === " "){
        return "Empty";
    }
    return

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let faultyItems = list;
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    // Validating Correct type of information with an alert
    if (validateInput(pilot.value) === "Is a Number"
    || validateInput(copilot.value) === "Is a Number"
    || validateInput(fuelLevel.value) === "Not a Number"
    || validateInput(cargoLevel.value) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    // Updating Shuttle Requirements
    } else {
        pilotStatus.innerHTML = (`Pilot Ready Pilot Name:${pilot.value}`);
         copilotStatus.innerHTML = (`Copilot Ready Copilot Name: ${copilot.value}`);

        if (fuelLevel.value < 10000 && cargoLevel.value > 10000){ // fuel bad, cargo bad
            fuelStatus.innerHTML =  "Fuel level is too low for launch!";
            cargoStatus.innerHTML =  "Cargo mass is too high for launch!";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel.value >= 10000 && cargoLevel.value > 10000){ // fuel good, cargo bad
            fuelStatus.innerHTML =  "Fuel level is high enough for launch";
            cargoStatus.innerHTML =  "Cargo mass is too high for launch!";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel.value < 10000 && cargoLevel.value <= 10000) { // fuel bad, cargo good
            fuelStatus.innerHTML = "Fuel level is too low for launch";
            cargoStatus.innerHTML = "Cargo mass is low enough for launch";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel.value >= 10000 && cargoLevel.value <= 10000) { // ideal conditions
            launchStatus.innerHTML = "Shuttle ready for launch";
            list.style.visibility = "visible";
            launchStatus.style.color = "green";
            cargoStatus.innerHTML = "Cargo mass low enough for launch.";
            fuelStatus.innerHTML = "Fuel level is high enough for launch";
        }
    };
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });
    console.log(planetsReturned);
    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = planets[Math.floor(Math.random()*planets.length)];
    return planet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;