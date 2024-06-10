const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nome:{
        type:String, required: true, max: 40
    },
    email:{
        type:String, required: true, max:40
    },
    senha:{
        type:String, required: true, max:40
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)




