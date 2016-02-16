# node-shell-cmd
exec more commands of linux-servers in the same time asynchronously.

---
* Install

    ```bash
    npm install node-shell-cmd
    ```
* Usage

    ```javascripts
    var nodeShell = require('node-shell-cmd');
    // format infomations of password
    var passwordInfos = nodeShell.makeLoginPassword(['192.168.1.1', '192.168.1.2'], 22, 'root', '123456');

    // format infomations of privateKey
    var privateKeyInfos = nodeShell.makeLoginPassword(['192.168.1.1', '192.168.1.2'], 22, 'root', '$HOME/.ssh/id_rsa.pub');

    // exec linux-shell
    nodeShell.exec(passwordInfos, 'uptime', function(err, r) {
        if (err) return console.log(err);
        console.log(r);
    });

    nodeShell.exec(privateKeyInfos, 'uptime', function(err, r) {
        if (err) return console.log(err);
        console.log(r);
    });
    ```
