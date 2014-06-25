var autobahn = require('autobahn');
var connection = new autobahn.Connection({
         url: 'ws://127.0.0.1:9000/',
         realm: 'realm1'
      });

connection.onopen = function (session) {

   // 4) call a remote procedure
   session.call('com.myapp.dale', []).then(
      function (res) {
         console.log(res);
      }
   );
};

connection.open();