// External resources importer

// Function to load an external JavaScript file
function loadScript(url) {
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
  }

// Function to load an external CSS file
function loadCSS(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

async function getNavBar(filePath) {
  let myfile = await fetch(filePath);
  let myText = await myfile.text();
  document.getElementById("NavBar").innerHTML = myText;
}


loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js");
loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js");


loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
loadCSS("Style/styles.css");


document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here
  // This code will execute once the DOM is ready
  getNavBar("Elements/nav.htm");
  loadScript("Javascript/MouseOverMtd.js");
  loadScript("Javascript/LightDarkMode.js");
});


