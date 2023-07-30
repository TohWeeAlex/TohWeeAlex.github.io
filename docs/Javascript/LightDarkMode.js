function darkMode() {
    // Add Dark classes
    // Navbar
    $("nav.navbar").addClass("dark-mode");
    $("a.nav-link").addClass("text-light");
    $("#nav-accordion").addClass("dark-mode");
    // Body elements
    $("body").addClass("dark-mode");
    $(".border").addClass("border-light");

    // Remove light class
    //Navbar
    $("nav.navbar").removeClass("light-mode");
    $("a.nav-link").removeClass("text-dark");
    $("#nav-toggle-mobile").css("background-image", "linear-gradient(#cfcfcf, #ffffff, #cfcfcf)");
    // Body elements
    $("body").removeClass("light-mode");
    $(".border").removeClass("border-dark");
    // Change session item value
    sessionStorage.setItem("viewMode", "dark");
}

function lightMode() {
    // Add Light classes
    // Navbar
    $("nav.navbar").addClass("light-mode");
    $("a.nav-link").addClass("text-dark");
    $("#nav-accordion").addClass("light-mode");
    $("#nav-toggle-mobile").css("background-image", "linear-gradient(#cfcfcf, #ffffff, #cfcfcf)");
    // Body elements
    $("body").addClass("light-mode");
    $(".border").addClass("border-dark");

    // Remove Dark classes
    // Navbar
    $("nav.navbar").removeClass("dark-mode");
    $("a.nav-link").removeClass("text-light");
    $("#nav-accordion").removeClass("dark-mode");
    // Body elements
    $("body").removeClass("dark-mode");
    $(".border").removeClass("border-light");
    // Change session item value
    sessionStorage.setItem("viewMode", "light");
}

function viewChange() {
    // View mode indicator
    if (($("#mode-text").text()) === "Light Mode") {
        $("#mode-text").text("Dark Mode");
    }
    else {
        $("#mode-text").text("Light Mode");
    }

    switch (sessionStorage.getItem("viewMode")) {
        case null:
            darkMode();
            console.log("click: dark");
            break;
        case "light":
            darkMode();
            console.log("click: dark");
            break;
        case "dark":
            lightMode();
            console.log("click: light");
            break;
    }
}

function initialMode() {
    switch (sessionStorage.getItem("viewMode")) {
        case null:
            lightMode();
            console.log("initial:" + sessionStorage.getItem("viewMode"));
            break;
        case "light":
            lightMode();
            console.log("initial:" + sessionStorage.getItem("viewMode"));
            break;
        case "dark":
            darkMode();
            document.getElementById("view-mode").setAttribute("checked", "");
            $("#mode-text").text("Dark Mode");
            console.log("initial:" + sessionStorage.getItem("viewMode"));
            break;
    }
}

console.log("on LDmode script load: " + sessionStorage.getItem("viewMode"));