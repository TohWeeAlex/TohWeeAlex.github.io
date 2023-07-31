// Fetch Valorant API info
//apiFetch();

$(document).ready(function () {
  //setup multiple rows of colours, can also add and remove while spinning but overall this is easier.
  initWheel();

  $("button").on("click", function () {
    spinWheel();
  });
});

async function initWheel() {
  var agentsList = [];
  // Get request to valorant API
  let data = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
  // Parse the response to JSON
  let agents = await data.json();
  // Get all Agent names
  for (let i = 0; i < agents.data.length; i++) {
    //console.log("from apiFetch: " + i + " " + agents.data[i].displayName + " class: " + agents.data[i].role.displayName );
    //console.log(agents.data[i].displayIcon);
    agentsList.push([agents.data[i].displayName, agents.data[i].role.displayName, agents.data[i].displayIcon]);
  }

  console.log(agentsList);

  var $wheel = $(".roulette-wrapper .wheel"),
    row = "";

  row += "<div class='row m-0 d-flex flex-nowrap'>";
  /*
  row += "  <div class='card red border'>1</div>";
  row += "  <div class='card black border'>14</div>";
  row += "  <div class='card red border'>2</div>";
  row += "  <div class='card black border'>13</div>";
  row += "  <div class='card red border'>3</div>";
  row += "  <div class='card black border'>12</div>";
  row += "  <div class='card red border'>4</div>";
  row += "  <div class='card green border'>0</div>";
  row += "  <div class='card black border'>11</div>";
  row += "  <div class='card red border'>5</div>";
  row += "  <div class='card black border'>10</div>";
  row += "  <div class='card red border'>6</div>";
  row += "  <div class='card black border'>9</div>";
  row += "  <div class='card red border'>7</div>";
  row += "  <div class='card black border'>8</div>";
  */
  /*
  for (let i = 0; i < AgentList.length; i++) {
    row += "  <div style='background-image:" + AgentList[i][3] + "' class='card red border'>1</div>";
  }
  */
  for (let i = 0; i < agentsList.length; i++) {
    //console.log(agentsList[i][2]);
    //row += "  <div class='card border' style='background-image:" + agentsList[i][2] + ";'></div>";
    row += "  <div class='card border'><img src='" + agentsList[i][2] + "' class='card-img object-fit-cover'></div>";
    //console.log("  <div class='card border'><img class='agent-icon' src='" + agentsList[i][2] + "></div>")
  }
  row += "</div>";

  for (var x = 0; x < 29; x++) {
    $wheel.append(row);
  }
}

function spinWheel() {
  var $wheel = $(".roulette-wrapper .wheel"),
    order = [0, 18, 11, 5, 21, 10, 6, 9, 20, 16, 7, 8, 1, 14, 17, 2, 13, 3, 12, 4, 15, 19],
    //position = order.indexOf(roll);
    position = Math.floor(Math.random() * order.length);

  //determine position where to land
  var rows = 12,
    card = 75 + 3 * 2,
    landingPosition = rows * 21 * card + position * card;

  var randomize = Math.floor(Math.random() * 75) - 75 / 2;

  landingPosition = landingPosition + randomize;

  var object = {
    x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100
  };

  $wheel.css({
    "transition-timing-function":
      "cubic-bezier(0," + object.x + "," + object.y + ",1)",
    "transition-duration": "6s",
    transform: "translate3d(-" + (landingPosition) + "px, 0px, 0px)"
  });

  
  setTimeout(function () {
    $wheel.css({
      "transition-timing-function": "",
      "transition-duration": ""
    });
    
    //var resetTo = -(position + randomize);
    //$wheel.css("transform", "translate3d(" + resetTo + "px, 0px, 0px)");
  },6 * 1000);

}

async function apiFetch() {
  var agentsList = [];
  // Get request to valorant API
  let data = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
  // Parse the response to JSON
  let agents = await data.json();
  console.log(agents);
  // Get all Agent names
  for (let i = 0; i < agents.data.length; i++) {
    //console.log("from apiFetch: " + i + " " + agents.data[i].displayName + " class: " + agents.data[i].role.displayName );
    //console.log(agents.data[i].displayIcon);
    agentsList.push([agents.data[i].displayName, agents.data[i].role.displayName, agents.data[i].displayIcon]);
  }
  //console.log(agentsList);
  return agentsList;
}