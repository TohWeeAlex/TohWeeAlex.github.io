// External resources importer

// Function to import navbar
async function getNavBar(filePath) {
  let myfile = await fetch(filePath);
  let myText = await myfile.text();
  var navBar = document.createElement( 'div' );
  navBar.setAttribute('id', "NavBar");
  //navBar.onload = initialMode();
  navBar.innerHTML = myText;
  document.body.insertBefore(navBar, document.body.firstElementChild);
  initialMode()
}

function runJQFunct(funct) {
    // Script that does something and depends on jQuery being there.
    if( window.$ ) {
      // do your action that depends on jQuery.
      funct;
  } else {
      // wait 50 milliseconds and try again.
      window.setTimeout( runJQFunct(funct), 50 );
  }
}

// Load external Javascripts after DOM has finished loading
document.addEventListener('DOMContentLoaded', function() {
  runJQFunct(getNavBar("Elements/nav.htm"));
  //initialMode()
});