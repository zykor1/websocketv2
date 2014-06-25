var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var ChatSchema = new Schema({
    _id: [String],
    mensajes: [{
        remitente: String,
        to: [String],
        mensaje: String,
        fecha_envio: { type: Date, default: Date.now },
        fecha_recibido: { type: Date },
        fecha_visto: { type: Date }
    }]
});
*/
var ChatSchema = new Schema({
    from: String,
    to: String,
    mensaje: String,
    fecha_envio: { type: Date, default: Date.now },
    fecha_recibido: { type: Date },
    fecha_visto: { type: Date }
});


var Chat = mongoose.model('Chat', ChatSchema);