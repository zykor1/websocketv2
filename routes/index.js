var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = mongoose.model("Chat");
var autobahn = require('autobahn');
var connection = new autobahn.Connection({
         url: 'ws://127.0.0.1:9000/',
         realm: 'realm1'
      });


connection.onopen = function (session) {

       function onevent(args) {
          //console.log("Event:", args);
       }

       session.subscribe('com.chat.saul', onevent);
       session.register('com.server.msgnuevo', msgNuevo);

};

connection.open();


function msgNuevo(args){
    var session = connection.session;
    var from = args[0];
    var to = args[1];
    var message = args[2];
    var mensaje = { "from": from, "to": to, "mensaje": message };
    if (es_spam(mensaje) == true){
        console.log("spam!!!!");
        return "spam";
    }
    var chat = new Chat(mensaje);
    chat.save(function (err){
        if (!err){
            enviarRespuesta(true);
        }else
            enviarRespuesta(false);
    });
    if (aux)
        return [new Date().toString(), mensaje];
    else
        return 0;
}


function es_spam(mensaje){
    try{
        var auxMensaje = mensaje;
        var now = new Date();
        var diff = now - 5000;
        var fecha_envio = {"$gte": diff, "$lt": now};
        auxMensaje.fecha_envio = fecha_envio;
        var valor;
        Chat.find(auxMensaje, function (erro, docs) {
            if (docs.length > 5)
                valor = true;
            else
                valor = false;
        });
        return valor;
    }catch (e)
    {
        console.log(e);
    }
}




/* GET home page. */
router.get('/', function (req, res) {

    Chat.find({to: "saul"}, function (erro, docs) {      
        res.render('index', {
            title: 'Websocket',
            mensajes: docs
        });
    });
});

/* router.post('/mensaje', function (req, res) {
    var chat = new Chat({ "remitente": "saul", "mensaje": req.body.mensaje });
    chat.save(function (err){
        console.log(err);
    });
    res.redirect('/');
}); */

module.exports = router;