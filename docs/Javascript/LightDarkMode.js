function darkMode() {
    // Add Dark classes
    $(".view-mode-display").text("Dark Mode");
    // Navbar desktop
    $("nav.navbar").addClass("dark-mode");
    $("a.nav-link").addClass("text-light");
    // Navbar mobile
    $("button.accordion-button").css("background-image", "linear-gradient(rgb(52, 60, 94), rgb(89, 99, 148), rgb(52, 60, 94))");
    $("button.accordion-button").addClass("text-light");
    $("a.list-group-item").addClass("dark-mode");
    // Body elements
    $("body").addClass("dark-mode");
    $(".border").addClass("border-light");

    // Remove light class
    //Navbar desktop
    $("nav.navbar").removeClass("light-mode");
    $("a.nav-link").removeClass("text-dark");
    //NavBar mobile
    $("button.accordion-button").removeClass("text-dark");
    $("button.accordion-button").removeClass("light-mode");
    // Body elements
    $("body").removeClass("light-mode");
    $(".border").removeClass("border-dark");
    // Change session item value
    localStorage.setItem("viewMode", "dark");
}

function lightMode() {
    // Add Light classes
    $(".view-mode-display").text("Light Mode");
    // Navbar desktop
    $("nav.navbar").addClass("light-mode");
    $("a.nav-link").addClass("text-dark");
    // Navbar mobile
    $("button.accordion-button").css("background-image", "linear-gradient(#cfcfcf, #ffffff, #cfcfcf)");
    $("button.accordion-button").addClass("text-dark");
    $("a.list-group-item").addClass("light-mode");
    
    // Body elements
    $("body").addClass("light-mode");
    $(".border").addClass("border-dark");

    // Remove Dark classes
    // Navbar desktop
    $("nav.navbar").removeClass("dark-mode");
    $("a.nav-link").removeClass("text-light");
    // Navbar mobile
    $("a.list-group-item").removeClass("dark-mode");
    $("a.list-group-item").removeClass("text-light");
    // Body elements
    $("body").removeClass("dark-mode");
    $(".border").removeClass("border-light");
    // Change session item value
    localStorage.setItem("viewMode", "light");
}

function viewChange() {
    // View mode indicator
    if (($(".view-mode-display").text()) === "Light Mode") {
        $(".view-mode-display").text("Dark Mode");
    }
    else {
        $(".view-mode-display").text("Light Mode");
    }

    // if ($('shylily-light').length) {
    //     shylilyMode();
    // }

    switch (localStorage.getItem("viewMode")) {
        case null:
            darkMode();
            //console.log("click: dark");
            break;
        case "light":
            darkMode();
            //console.log("click: dark");
            break;
        case "dark":
            lightMode();
            //console.log("click: light");
            break;
    }

    if (($('#shylily-light').length) || ($('#shylily-dark').length)) {
        shylilyMode();
	}
}

function initialMode() {
    switch (localStorage.getItem("viewMode")) {
        case null:
            lightMode();
            $(".view-mode-display").text("Light Mode");
            //console.log("initial:" + localStorage.getItem("viewMode"));
            break;
        case "light":
            lightMode();
            $(".view-mode-display").text("Light Mode");
            //console.log("initial:" + localStorage.getItem("viewMode"));
            break;
        case "dark":
            darkMode();
            document.getElementById("view-mode").setAttribute("checked", "");
            $(".view-mode-display").text("Dark Mode");
            //console.log("initial:" + localStorage.getItem("viewMode"));
            break;
    }
}

function shylilyMode() {
    switch (localStorage.getItem("viewMode")) {
        case null:
            //Light mode ON
            $("#shylily-light").show();
            //Dark mode OFF
            $("#shylily-dark").hide();
            break;
        case "light":
            //Light mode ON
            $("#shylily-light").show();
            //Dark mode OFF
            $("#shylily-dark").hide();
            break;
        case "dark":
            //Dark mode ON
            $("#shylily-dark").show();
            //Light mode OFF
            $("#shylily-light").hide();
            break;
    }
}

//console.log("on LDmode script load: " + localStorage.getItem("viewMode"));