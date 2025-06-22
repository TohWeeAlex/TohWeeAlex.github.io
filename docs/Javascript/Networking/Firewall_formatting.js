contentSources = [
  ["port information", "https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers"],
  ["enabling VNC on pi", "https://www.raspberrypi.com/documentation/computers/remote-access.html#vnc"],
  ["installing Zabbix on pi", "https://bestmonitoringtools.com/how-to-install-zabbix-on-raspberry-pi-raspbian/"]
]

table1 = [
    ["Port", "Protocol", "Service", "Usage", "Further Information(if any)"],
    ["53", "TCP/UDP", "DNS", "Service to reslove domain names", "RFC 1035"],
    ["67", "TCP/UDP", "DHCP", "DHCP uses UDP as its transport protocol. DHCP messages from a client to a server are sent to the 'DHCP server' port (67), and DHCP messages from a server to a client are sent to the 'DHCP client' port(68). For my home network without a sever we will only allow port 67", "RFC 2131"],
    ["80", "TCP/UDP", "HTTP", "Required for access to non-HTTPS websites (many sites auto-redirect to HTTPS, but some content may break. If you want maximum security, considering opening this port if certain web services don't work). ", "RFC 1945(HTTP)"],
    ["123", "TCP/UDP", "NTP", "NTP (Network Time Protocol) is used to synchronize the clocks of computer systems across a network", "RFC 5905"],
    ["443", "TCP/UDP", "HTTPS(TCP), HTTP3/QUIC(UDP)", "Used for HTTPS, Which is HTTP over TLS, to encrypt information when interacting with a web server", "RFC 2818(HTTPS), RFC 9000(QUIC)"],
    ["853", "TCP/UDP", "DNS over TLS", "If you configure clients to use DNS-over-TLS, then port 853 must be allowed. Otherwise, you can skip it if all DNS is done via 53", "RFC 7858"],
    ["1194", "TCP/UDP", "OpenVPN", "Required for OpenVPN to work(Can be blocked if OpenVPN is not in use)", ""],
    ["5223", "TCP", "Apple Push Notification Service(APNs)", "Needed if there are Apple products in your network, Used for Apple Push Notification Service otherwise Apple product may not recieve notification", ""],
    ["5228-5230", "TCP", "Google Play, Google Cloud Messaging(GCM)", "Needed if there are Android products in your network, Android products may not work properly if these ports are blocked", ""],
    ["5235,5236", "TCP", "Firebase Cloud Messaging(FCM)", "Cloud service for messages and notifications for Android, iOS, and web applications", ""],
    ["8080", "TCP", "Speedtest.net", "Used to test Internet speeds for endhosts(Can be blocked if Speedtest.net is not in use)", ""],
    ["51820", "UDP", "WireGuard", "Needed for WireGuard VPN to work(Can be blocked if WireGuard is not in use)", ""],
]

let FirewallContent = [
  [
    ["h1", "mb-4", "", "What services uses which port?", ""],
    ["h4", "", "", "Port and Services Table", ""],
    ["table", "table table-bordered border table-hover", "port-table", table1, ""],
    ["p", "description", "", "The above is a table with the service that are being used and the respective ports and protocols, using this table we can decide which port to close or leave open so that there is a little unwanted network traffic as possible.", ""],
  ],
  [
    ["h1", "mb-4", "", "firewall logging using Zabbix on a Raspberry Pi 4", ""],
    // Tailscale installation
    ["h3", "mt-4", "", "Installing Tailscale for troubleshooting via remote access", ""],
    ["p", "description", "", "For the following you will need to create an account for Tailscale. after creating an account and installing Tailscale on the device which you want to use to remotely access Zabbix. For installation on the Raspberry Pi input the following command in your terminal", ""],
    ["pre", "", "", "1curl -fsSL https://tailscale.com/install.sh | sh", ""],
    ["p", "description", "", "After running the the command Tailscale will be installed and you will need to run the next command to get start it", ""],
    ["pre", "", "", "sudo tailscale up", ""],
    ["p", "description", "", "upon starting Tailscale, if you are not logged in you will recieve a link to log in. Once you log in, the Raspberry will be connect to the Tailscale network and you should be able to see it on your admin machines dashboard", ""],
    // VNC Configuration
    ["h3", "mt-5", "", "Configuring VNC on the Raspberry Pi for troubleshooting", ""],
    ["p", "description", "", "Next, We need to turn on VNC server on the Raspberry Pi so that we can troubleshoot any issues that occur, remotely. To turn it on, type the following into the terminal:", ""],
    ["pre", "", "",  "sudo raspi-config", ""],
    ["p", "description", "", `Select "3 Interface Options".`, ""],
    ["img", "", "",  "", "../Elements/Networking/Firewall/01_Firewall.png"],
    ["p", "description", "", `Next, select "I3 VNC".`, ""],
    ["img", "", "",  "", "../Elements/Networking/Firewall/02_Firewall.png"],
    ["p", "description", "", `Next, select "Yes".`, ""],
    ["img", "", "",  "", "../Elements/Networking/Firewall/03_Firewall.png"],
    ["p", "description", "", `Finally, VNC will be enabled(you may need to restart for it to work).`, ""],
    ["img", "", "",  "", "../Elements/Networking/Firewall/04_Firewall.png"],
  ] 
]

function creatingElement(elementType="", classes="", Id="", innerhtml="", url="") {
  let element = document.createElement(elementType);
  switch (elementType) {
    case "img":
      element.src = url
      element.className = "img-fluid" + classes 
    case "pre":
      element.innerHTML = innerhtml;
      element.className = "user-select-all"
      break;
    case "table":
      element.className = classes;
      element.id = Id;
      for (tableRowIndex = 0; tableRowIndex < innerhtml.length; tableRowIndex++) {
        let tableRowElement = document.createElement("tr");
        tableRowElement.className = "p-0";
        for (tableColIndex = 0; tableColIndex < innerhtml[tableRowIndex].length; tableColIndex++) {
          let rowType;
          if (tableRowIndex == 0) {
            rowType = "th";
          }
          else {
            rowType = "td";
          }
          let tableColElement = document.createElement(rowType);
          tableColElement.className = "col p-2";
          if (tableColIndex == 3) {
            tableColElement.className = "col-8 p-2";
          }
          tableColElement.innerHTML = innerhtml[tableRowIndex][tableColIndex];
          tableRowElement.appendChild(tableColElement);
        };
        element.appendChild(tableRowElement)
      }
      break;
    case "div":
      element.className = classes;
      break;
    case "p":
      element.className = classes;
      element.innerHTML = innerhtml;
      break;
    default:
      element.src = url;
      element.className = classes;
      element.innerHTML = innerhtml;
  }
  return element
}

function contentLayout(content) {
  // Get Main Content Container
  let contentContainer = document.getElementById("contentContainer");
  // Create content
  for (contextIndex = 0; contextIndex < content.length; contextIndex++) {
    // Create container
    let container = creatingElement("div", "component-container table-responsive p-4")
    contentContainer.appendChild(container)
    // Create all the contents listed
    for (ElementIndex = 0; ElementIndex < content[contextIndex].length; ElementIndex++) {
      let contentElement = creatingElement(content[contextIndex][ElementIndex][0], content[contextIndex][ElementIndex][1],content[contextIndex][ElementIndex][2], content[contextIndex][ElementIndex][3], content[contextIndex][ElementIndex][4])
      container.appendChild(contentElement)
    }
  }
}

contentLayout(FirewallContent)