// Fetch Valorant API info
//apiFetch();

$(document).ready(function () {
  //setup multiple rows of colours, can also add and remove while spinning but overall this is easier.
  initWheel();

  $("button").on("click", function () {
    document.getElementById( 'spin-wheel' ).disabled = true;
    spinWheel();
  });
});

async function initWheel() {
  var agentsList = [];
  // Get request to valorant API
  let data = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
  // Parse the response to JSON
  let agents = await data.json();
  //console.log(agents.data);
  // Get all Agent names
  for (let i = 0; i < agents.data.length; i++) {
    //console.log("from apiFetch: " + i + " " + agents.data[i].displayName + " class: " + agents.data[i].role.displayName );
    //console.log(agents.data[i].displayIcon);
    agentsList.push([agents.data[i].displayName, agents.data[i].role.displayName, agents.data[i].displayIcon, agents.data[i].backgroundGradientColors]);
  }

  //console.log(agentsList);
  var $wheel = $(".roulette-wrapper .wheel"),
    row = "";

  row += "<div class='row m-0 d-flex flex-nowrap'>";

  for (let i = 0; i < agentsList.length; i++) {
    row += "  <div class='card border border-3'style='background-image:linear-gradient(#" + agentsList[i][3][0] + ", #" + agentsList[i][3][1] + ", #" + agentsList[i][3][2] + ", #" + agentsList[i][3][3] + ");'><img src='" + agentsList[i][2] + "' class='card-img object-fit-cover'></div>";
  }
  row += "</div>";

  for (var x = 0; x < 45; x++) {
    $wheel.append(row);
  }
}

function spinWheel() {
  var $wheel = $(".roulette-wrapper .wheel"),
    order = [0, 18, 11, 5, 21, 10, 6, 9, 20, 16, 7, 8, 1, 14, 17, 2, 13, 3, 12, 4, 15, 19],
    position = order.indexOf(Math.floor(Math.random() * 22));

  //randomise position to land
  var rows = 12,
    card = 75 + 3.5 * 2,
    landingPosition = rows * 22 * card + position * card;

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
    transform: "translate3d(-" + landingPosition + "px, 0px, 0px)"
  });

  setTimeout(function () {
    $wheel.css({
      "transition-timing-function": "",
      "transition-duration": ""
    });

    document.getElementById( 'spin-wheel' ).disabled = false;
    var resetTo = -(position * card + randomize);
    $wheel.css("transform", "translate3d(" + resetTo + "px, 0px, 0px)");
  }, 6 * 1000);

}