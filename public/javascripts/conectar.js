var connection = new autobahn.Connection({
         url: 'ws://127.0.0.1:9000/',
         realm: 'realm1'
      });

connection.onopen = function (session) {

   // 1) subscribe to a topic
   function onevent(args) {
      console.log("Event:", args);
   }
   session.subscribe('com.myapp.hello', onevent);

   // 2) publish an event
   session.publish('com.myapp.hello', ['Hello, world!']);

   // 3) register a procedure for remoting
   function add2(args) {
      operacion = args[0] + args[1];
      session.publish('com.myapp.hello', ['el resultado es ... ?']);
      return "el resultado es: " + operacion;
   }
   session.register('com.myapp.add2', add2);

   // 4) call a remote procedure
   session.call('com.myapp.add2', [2, 3]).then(
      function (res) {
         console.log("Result:", res);
      }
   );
};

connection.open();