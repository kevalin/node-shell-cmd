var Client = require('ssh2').Client;
var async = require('async');
var fs = require('fs');

var all = {
    // use ssh-password to login server
    'makeLoginPassword': function(ip, port, username, password, timeout) {
        var authInfo = {
            'host': ip,
            'port': port || 22,
            'username': username || 'root',
            'password': password,
            'readyTimeout': timeout || 200000
        }

        return authInfo
    },
    // use ssh-privatekey to login server
    'makeLoginPrivateKey': function(ip, port, username, privateKey, timeout) {
        var authInfo = {
            'host': ip,
            'port': port || 22,
            'username': username || 'root',
            'password': fs.readFileSync(privateKey),
            'readyTimeout': timeout || 200000
        }

        return authInfo
    },
    // exec linux shell
    'exec': function(ipObjArray, shellCmd, callback) {
        if (typeof ipObjArray != 'object' || typeof shellCmd != 'string' || ipObjArray.length == 0) {
            var err = new Error('bad parameter');
            callback(err, null)
        }

        async.map(ipObjArray, function(host, cb) {
            var conn = 'ip_' + host['host'];
            conn = new Client();

            conn.connect(host);
            conn.on('ready', function() {
                conn.exec(shellCmd, {"maxBuffer" : 1024000 * 1024}, function(err, stream) {
                    var tempResult = {};
                    var tempData = '';
                    tempResult['ip'] = host['host'];
                    stream.on('data', function(data) {
                        tempData += data;
                    }).on('close', function(code) {
                        conn.end();
                        tempResult['stdout'] = tempData.toString();
                        tempResult['code'] = code;
                        cb(err, tempResult);
                    }).stderr.on('data', function(data) {
                        tempResult['stderr'] = data.toString();
                    })
                })
            })
        }, function(err, result) {
            callback(err, result)
        })
    }
};

module.exports = all
