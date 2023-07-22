function darkMode() {
    // Add Dark classes
    $("nav.navbar").addClass("dark-mode");
    $("a.nav-link").addClass("text-light");
    $("body").addClass("dark-mode");
    // Remove light class
    $("nav.navbar").removeClass("light-mode");
    $("a.nav-link").removeClass("text-dark");
    $("body").removeClass("light-mode");
    // Change session item value
    sessionStorage.setItem("viewMode", "dark");
}

function lightMode() {
    // Add Light classes
    $("nav.navbar").addClass("light-mode");
    $("a.nav-link").addClass("text-dark");
    $("body").addClass("light-mode");
    // Remove Dark classes
    $("nav.navbar").removeClass("dark-mode");
    $("a.nav-link").removeClass("text-light");
    $("body").removeClass("dark-mode");
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

initialMode();
console.log(sessionStorage.getItem("viewMode"));