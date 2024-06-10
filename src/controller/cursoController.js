let Curso = require('../models/CursoModel')

exports.getCurso = async function (req, res) {
    /*
    #swagger.tags = ['Curso']
    #swagger.description = 'Lista os Curso cadastrados'
    */
    try {
        const result = await Curso.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getCursoId = async function (req, res) {
    /*
    #swagger.tags = ['Curso']
    #swagger.description = 'Busca um Curso pelo ID'
    */
    try {
        const result = await Curso.findById(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.attCurso = async function (req, res) {
        /*
    #swagger.tags = ['Curso']
    #swagger.description = 'Atualiza um Curso Cadastrado'
    */
    try {
        const result = await Curso.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.delCurso = async function (req, res) {
        /*
    #swagger.tags = ['Curso']
    #swagger.description = 'Deleta um Curso cadastrado'
    */
    try {
        await Curso.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: 'Curso excluído com sucesso!' })
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao excluir o Curso.` })
    }
}

exports.createCurso = function (req, res) {
    /*
    #swagger.tags = ['Curso']
    #swagger.description = 'Insere um novo Curso'
    */
    let curso = new Curso(
        {
            nome: req.body.nome,
            totalHoras: req.body.totalHoras
        }
    );

    try {
        curso.save()
        res.status(201).send(curso.toJSON())
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar o Curso.` })
    }
};