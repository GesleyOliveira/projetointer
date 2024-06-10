const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let professorSchema = new Schema({
    nome:{
        type: String, required: true, max:30
    },
    cpf:{
        type: String, required: true, max:30
    },
    cursos:{
        type: Array, required: false
    },
})

module.exports = mongoose.model('Professor', professorSchema)