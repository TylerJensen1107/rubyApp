//Called when window is loaded
window.onload = function() {
    fetchData();
    console.log("working");

    document.getElementById("add").onclick = function() {
      var text = document.getElementById("new-player-name")
      if(text.value.length > 0)
        sendData(text.value);
    }

}

//Adds an individual row to the table of ping pong players
function appendPlayerRow(player, wins, losses, id) {
  var row = document.createElement("tr");
  //row.className = "row";
  createPlayerInnerHTML(player, id, wins, losses, row);
  row.id = id;
  document.getElementById("table-body").appendChild(row);
}

//Function used to update the row parameter (should be a tr element), given player data
function createPlayerInnerHTML(player, id, wins, losses, row) {
  var ratio = wins / losses ? (wins / losses).toFixed(2) : "No Ratio";
  if(ratio === "Infinity") ratio = "Undefeated";
  
  var addWinButton = document.createElement("button");
  addWinButton.onclick = function() {
    getPlayer(id, true);
  }
  var addLossButton = document.createElement("button");
  addLossButton.onclick = function() {
    getPlayer(id, false);
  }
  var change = document.createElement("td");
  var name = document.createElement("td");
  var winsElement = document.createElement("td");
  var lossesElement = document.createElement("td");
  var ratioElement = document.createElement("td");

  name.innerHTML = player;
  winsElement.innerHTML = wins;
  lossesElement.innerHTML = losses;
  ratioElement.innerHTML = ratio;

  addWinButton.innerHTML = "Add Win";
  addLossButton.innerHTML = "Add Loss";
  change.appendChild(addLossButton);
  change.appendChild(addWinButton);

  row.appendChild(name);
  row.appendChild(winsElement);
  row.appendChild(lossesElement);
  row.appendChild(ratioElement);
  row.appendChild(change);

}

//Requests all ping pong players
function fetchData() {
  var request = new XMLHttpRequest();
  request.onload = loadPlayers;
  request.open("GET", "/pong");
  // send the collected data as JSON
  request.send();
}

//retreives an individual player from the API, used to also
//update, so wether that player won or lost is the second paramter
function getPlayer(id, win) {
  var request = new XMLHttpRequest();
  request.onload = function() {
    updatePlayer(request.responseText, win);
  }
  request.open("GET", "/pong/"+id);

  // send the collected data as JSON
  request.send();
}

//Renders the updated player on the 
function updatePlayer(data, win) {
  var json = JSON.parse(data);
  var request = new XMLHttpRequest();
  request.onload = renderUpdate;
  request.open("PATCH", "/pong/"+json.id);

  // send the collected data as JSON
  var formData = new FormData();
  var data;
  if(win)
    data = {"player" : {"name" : json.name, "wins" : json.wins + 1, "losses" : json.losses}};
  else
    data = {"player" : {"name" : json.name, "wins" : json.wins, "losses" : json.losses + 1}};
  formData.append('article', JSON.stringify(data));
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  request.send(JSON.stringify(data));
}

//Changes the appropriate row based on player wins or losses updated
function renderUpdate() {
  var playerStats = JSON.parse(this.responseText);
  var playerRow = document.getElementById(playerStats.id);
  playerRow.innerHTML = "";
  createPlayerInnerHTML(playerStats.name, playerStats.id, playerStats.wins, playerStats.losses, playerRow);

}


//Loads all ping pong players
function loadPlayers() {
  var json = JSON.parse(this.responseText);
  for(var i = 0; i < json.length; i++) {
    appendPlayerRow(json[i].name, json[i].wins, json[i].losses, json[i].id);
  }
}

//Creates a new player given player name
function sendData(playerName) {
  var request = new XMLHttpRequest();
  request.onload = success;
  request.open("POST", "/pong");
  var formData = new FormData();
  var data = {"player" : {"name" : playerName, "wins" : 0, "losses" : 0}};
  formData.append('article', JSON.stringify(data));
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  request.send(JSON.stringify(data));
}

// Process returned data
function success() {
    var json = JSON.parse(this.responseText);
    appendPlayerRow(json.name, 0, 0, json.id);
}
