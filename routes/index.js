var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Websocket'
    });
});

router.post('/mensaje', function (req, res) {
    res.render('index',{
        title: 'Websocket',
        mensajes: [
            { "nombre": "saul", "mensaje": req.body.mensaje }
        ]
    });
});


module.exports = router;