function viewChange() {
    // Dark mode
    $("nav.navbar").toggleClass("dark-mode");
    $("a.nav-link").toggleClass("text-light");
    $("body").toggleClass("dark-mode");

    // Light mode
    $("nav.navbar").toggleClass("light-mode");
    $("a.nav-link").toggleClass("text-dark");
    $("body").toggleClass("light-mode");

    // View mode indicator
    if (($("#mode-text").text()) == "Light Mode") {
        $("#mode-text").text("Dark Mode");
    }
    else {
        $("#mode-text").text("Light Mode");
    }
}

function initialMode() {
    $("nav.navbar").toggleClass("light-mode");
    $("a.nav-link").toggleClass("text-dark");
    $("body").toggleClass("light-mode");
}

initialMode();