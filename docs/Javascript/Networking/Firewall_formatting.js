contentSources = [
  ["port information", "https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers"],
  ["enabling VNC on pi", "https://www.raspberrypi.com/documentation/computers/remote-access.html#vnc"],
  ["installing Zabbix on pi", "https://bestmonitoringtools.com/how-to-install-zabbix-on-raspberry-pi-raspbian/"],
  ["setting up zabbix for email notifications", "https://github.com/albin-lindstrom/zabbix-edgemax-template"],
  ["setting up email notifications", "https://www.youtube.com/watch?v=9DT7kR8fa0o"],
]

Zabbixcommandlist = [
  [
    `1curl -fsSL https://tailscale.com/install.sh | sh`,
    `sudo tailscale up`,
  ],
  [
    `sudo raspi-config`,
    `sudo apt install mariadb-server -y`,
    `######sudo dpkg-reconfigure locales`,
    `systemctl start mariadb`,
    `systemctl enable mariadb`,
    `sudo mysql_secure_installation`,
    `mysql> create database [Database Name] character set utf8mb4 collate utf8mb4_bin;`,
    `mysql> create user [Username]@localhost identified by '[Password]';`,
    `mysql> set global log_bin_trust_function_creators = 1;`,
    `mysql> quit;`,
    `zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -u [Username] -p [Database name]`,
    `sudo nano /etc/zabbix/zabbix_server.conf`,
    `DBPassword=password`,
    `sudo nano /etc/zabbix/nginx.conf`,
    `# listen 8080; # server_name example.com;`,
    `systemctl restart zabbix-server zabbix-agent nginx php8.2-fpm`,
    `systemctl enable zabbix-server zabbix-agent nginx php8.2-fpm`,
  ],
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

function contentLayout() {
  let preElement1 = document.getElementById("pre1")
  preElement1.innerHTML = `Enter current password for root (enter for none): <span class="user-input">[Press Enter]</span>
Switch to unix_socket authentication [Y/n]: <span class="user-input">[y]</span>
Change the root password? [Y/n]: <span class="user-input">[y]</span>
New password: <span class="user-input">[Enter new MariaDB account password]</span>
Re-enter new password: <span class="user-input">[Repeat new MariaDB account password]</span>
Remove anonymous users? [Y/n]: <span class="user-input">[y]</span>
Disallow root login remotely? [Y/n]: <span class="user-input">[y]</span>
Remove test database and access to it? [Y/n]: <span class="user-input">[y]</span>
Reload privilege tables now? [Y/n]: <span class="user-input">[y]</span>`
  let preElement2 = document.getElementById("pre2")
  preElement2.innerHTML = `mysql -u root -p
[Input Password]
mysql> set global log_bin_trust_function_creators = 0;
mysql> quit;`
  let preElement3 = document.getElementById("pre3")
  preElement3.innerHTML = `sudo nano /etc/zabbix/zabbix_server.conf
[uncomment and change the "DBPassword" variable to your <span class="user-input">[database password]</span>]
DBPassword=<span class="user-input">[database password]</span>`
  let preElement4 = document.getElementById("pre4")
  preElement4.innerHTML = `sudo nano /etc/zabbix/nginx.conf
listen <span class="user-input">[listening port]</span>;
server_name <span class="user-input">[Server Name]</span>;`
  let preElement5 = document.getElementById("pre5")
  preElement5.innerHTML = `systemctl restart zabbix-server zabbix-agent nginx php8.2-fpm
systemctl enable zabbix-server zabbix-agent nginx php8.2-fpm`
  let preElement6 = document.getElementById("pre6")
  preElement6.innerHTML = `*The inputs are case sensitive*
Username=Admin
Password=zabbix`
}

contentLayout()