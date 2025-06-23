contentSources = [
  ["port information", "https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers"],
  ["enabling VNC on pi", "https://www.raspberrypi.com/documentation/computers/remote-access.html#vnc"],
  ["installing Zabbix on pi", "https://bestmonitoringtools.com/how-to-install-zabbix-on-raspberry-pi-raspbian/"]
]

function sortTable(n, type) {
  const table = document.getElementById("port-table");
  let switching = true;
  let dir = "asc";        // sort direction
  let switchcount = 0;    // number of switches done

  while (switching) {
    switching = false;
    const rows = table.rows;
    
    for (let i = 1; i < rows.length - 1; i++) {
      let shouldSwitch = false;
      const x = rows[i].getElementsByTagName("TD")[n];
      const y = rows[i + 1].getElementsByTagName("TD")[n];
      const xText = x.textContent.trim();
      const yText = y.textContent.trim();

      // decide comparison mode
      const isNumeric = type === "num"
        || (type !== "alpha" && !isNaN(parseFloat(xText)) && !isNaN(parseFloat(yText)));

      if (isNumeric) {
        // numeric comparison
        const xVal = parseFloat(xText);
        const yVal = parseFloat(yText);

        if (
             (dir === "asc"  && xVal  > yVal) ||
             (dir === "desc" && xVal  < yVal)
           ) {
          shouldSwitch = true;
        }
      } else {
        // alphabetic comparison (case-insensitive)
        const xVal = xText.toLowerCase();
        const yVal = yText.toLowerCase();

        if (
             (dir === "asc"  && xVal  > yVal) ||
             (dir === "desc" && xVal  < yVal)
           ) {
          shouldSwitch = true;
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
        break;
      }
    }

    // if no switching happened and we were ascending, switch to descending
    if (!switching && switchcount === 0 && dir === "asc") {
      dir = "desc";
      switching = true;
    }
  }
}