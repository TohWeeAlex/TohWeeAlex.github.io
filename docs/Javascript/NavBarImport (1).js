window.addEventListener('DOMContentLoaded', function() {
    fetch('Elements/nav.htm')
    .then(response => response.text())
    .then(html => {
        document.getElementById('NavBar').innerHTML = html;
    });
});