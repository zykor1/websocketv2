var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = mongoose.model("Chat");

/* GET home page. */
router.get('/', function (req, res) {
    Chat.find({remitente: "saul"}, function (erro, docs) {
        console.log(docs);
        res.render('index', {
            title: 'Websocket',
            mensajes: docs
        });
    });
});

router.post('/mensaje', function (req, res) {
    var chat = new Chat({ "remitente": "saul", "mensaje": req.body.mensaje });
    chat.save(function (err){
        console.log(err);
    });
    res.redirect('/');
});


module.exports = router;