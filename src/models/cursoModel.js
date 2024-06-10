const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cursoSchema = new Schema({
    nome:{
        type: String, required: true, max:30
    },
    totalHoras:{
        type: Number, required: true
    },
})

module.exports = mongoose.model('Curso', cursoSchema)