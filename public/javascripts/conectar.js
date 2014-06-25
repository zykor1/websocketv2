var connection = new autobahn.Connection({
         url: 'ws://10.1.47.232:9000/',
         realm: 'realm1'
      });

connection.onopen = function (session) {
   console.log("abierto?");
   // 1) subscribe to a topic
   function onevent(args) {
      console.log(args);
      if (args[3] != session.id)
         addMensaje(args);
   }
   session.subscribe('com.chat.saul', onevent);
};
connection.open();


   function envia_mensaje(){
         var session = connection.session;
         var from  = $('#from').val();
         var message  = $('#message').val();
         session.call('com.server.msgnuevo', [from, 'saul', message]).then(
            function (res) {
               console.log(res);
               /*if ( res != 0 ){
                  console.log(res);
                  if (res == "spam"){
                     $('#mensaje_servidor').html("<h1>No hagas spam</h1>");
                  }else{
                     addMensaje(res);
                     res.push(session.id);
                     session.publish('com.chat.saul', res, {}, {exclude_me: true});
                  }
               }*/
            }
         );
   }


function addMensaje(info){
   html = "<p>from: " + info[1].from + " mensaje: " + info[1].mensaje + "</p>";
   $('.mensajes').append(html);
}