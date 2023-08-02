// External resources importer

// Function to load an external JavaScript file
function loadScript(url, co) {
  var script = document.createElement('script');
  script.src = url;
  script.crossOrigin = co;
  document.head.appendChild(script);
}

// Function to load an external CSS file
function loadCSS(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadMeta() {
  var metaViewport = document.createElement('meta');
  metaViewport.name = 'viewport';
  metaViewport.content = 'width=device-width, initial-scale=1';
  document.head.appendChild(metaViewport);
  var metaCharset = document.createElement('meta');
  metaCharset.charset = 'utf-8';
  document.head.appendChild(metaCharset);
}

async function getNavBar(filePath) {
  let myfile = await fetch(filePath);
  let myText = await myfile.text();
  document.getElementById("NavBar").innerHTML = myText;
}

// Load metadata
loadMeta();

// Load external scripts
loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js", "");
loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js", "");
loadScript("https://kit.fontawesome.com/17a7db9b22.js", "anonymous");

// Load CDNs
loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
loadCSS("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");
loadCSS("Style/styles.css");

// Load external Javascripts after DOM has finished loading
document.addEventListener('DOMContentLoaded', function() {
  getNavBar("Elements/nav.htm");
  loadScript("Javascript/MouseOverMtd.js");
  loadScript("Javascript/LightDarkMode.js");
});

//console.log("on import script load: " + sessionStorage.getItem("viewMode"));



