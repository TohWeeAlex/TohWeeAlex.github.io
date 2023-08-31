function darkMode() {
    // Add Dark classes
    $(".view-mode-display").text("Dark Mode");
    // Navbar desktop
    $("nav.navbar").addClass("dark-mode");
    $("a.nav-link").addClass("text-light");
    $("nav ul.dropdown-menu.fade-down").addClass("text-bg-dark");
    $("nav ul.dropdown-menu.fade-down a.dropdown-item").addClass("text-light");
    // Navbar mobile
    $("nav.fixed-top").addClass("bg-dark navbar-dark");
    $("nav#nav-mobile div.offcanvas").addClass("text-bg-dark");
    $("nav#nav-mobile button.btn-close").addClass("btn-close-white");
    $("nav#nav-mobile ul.dropdown-menu").addClass("text-bg-dark");
    $("nav#nav-mobile ul.dropdown-menu a.dropdown-item").addClass("text-light");
    // Body elements
    $("body").addClass("dark-mode");
    $(".border").addClass("border-light");

    // Remove light class
    //Navbar desktop
    $("nav.navbar").removeClass("light-mode");
    $("a.nav-link").removeClass("text-dark");
    // Navbar mobile
    $("nav.fixed-top").removeClass("bg-body-tertiary");
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
    $("nav.fixed-top").addClass("bg-body-tertiary");
    // Body elements
    $("body").addClass("light-mode");
    $(".border").addClass("border-dark");

    // Remove Dark classes
    // Navbar desktop
    $("nav.navbar").removeClass("dark-mode");
    $("a.nav-link").removeClass("text-light");
    $("nav ul.dropdown-menu.fade-down").removeClass("text-bg-dark");
    $("nav ul.dropdown-menu.fade-down a.dropdown-item").removeClass("text-light");
    // Navbar mobile
    $("nav.fixed-top").removeClass("bg-dark navbar-dark");
    $("nav div.offcanvas").removeClass("text-bg-dark");
    $("nav button.btn-close").removeClass("btn-close-white");
    $("nav#nav-mobile ul.dropdown-menu").removeClass("text-bg-dark");
    $("nav#nav-mobile ul.dropdown-menu a.dropdown-item").removeClass("text-light");
    // Body elements
    $("body").removeClass("dark-mode");
    $(".border").removeClass("border-light");
    // Change session item value
    localStorage.setItem("viewMode", "light");
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

function introNeon() {
    switch (localStorage.getItem("viewMode")) {
        case null:
            //Neon mode OFF
            $("#intro-primary").removeClass("neon");
            break;
        case "light":
            //Neon mode OFF
            $("#intro-primary").removeClass("neon");
            break;
        case "dark":
            //Neon mode ON
            $("#intro-primary").addClass("neon");
            break;
    }
}

function viewChange() {
    // View mode indicator
    if (($(".view-mode-display").text()) === "Light Mode") {
        $(".view-mode-display").text("Dark Mode");
    }
    else {
        $(".view-mode-display").text("Light Mode");
    }

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

    //Shylily toggle
    if (($('#shylily-light').length) || ($('#shylily-dark').length)) {
        shylilyMode();
	}

    //Intro Neon toggle
    if (($('#intro-primary').length)) {
        introNeon();
    }
}

function initialMode() {
    const switchDesktop = document.getElementById("view-mode-desktop");
    const switchMobile = document.getElementById("view-mode-mobile");
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
            switchDesktop.setAttribute("checked", "");
            switchMobile.setAttribute("checked", "");
            $(".view-mode-display").text("Dark Mode");
            //console.log("initial:" + localStorage.getItem("viewMode"));
            break;
    }

    //Shylily toggle
    if (($('#shylily-light').length) || ($('#shylily-dark').length)) {
        shylilyMode();
	}

    //Intro Neon toggle
    if (($('#intro-primary').length)) {
        introNeon();
    }
}

//console.log("on LDmode script load: " + localStorage.getItem("viewMode"));