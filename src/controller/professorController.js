let Professor = require('../models/professorModel')

exports.getProf = async function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Lista os professores'
    */
    try {
        const result = await Professor.find()
        res.status(200).render('cadastrarProfessor', {professores: result})
    } catch (err) {
        res.status(500).json(err)
    }
};

exports.getProfId = async function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Obtém um professor pelo ID'
    #swagger.parameters['id'] = { description: 'ID do professor' }
    */
    try {
        const result = await Professor.findById(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
};

exports.getProfIdLista = async function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Obtém um professor pelo ID'
    #swagger.parameters['id'] = { description: 'ID do professor' }
    */
    try {
        const professor = await Professor.findById(req.params.id)
        const result = await Professor.find()
        res.status(200).render('editarProfessor', {professores: result, professor: professor})
    } catch (err) {
        res.status(500).json(err)
    }
};


exports.attProf = async function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Atualiza os dados do professor pelo ID'
    #swagger.parameters['id'] = { description: 'ID do professor' }
    */
    try {
        const result = await Professor.findByIdAndUpdate(req.body.id, req.body, {new: false})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
};

exports.delProf = async function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Deleta o professor pelo ID'
    #swagger.parameters['id'] = { description: 'ID do professor' }
    */
    try {
        await Professor.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: 'Professor excluído com sucesso!' })
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao excluir o professor.` })
    }
};

exports.createProf = function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Insere um novo professor'
    */
    let professor = new Professor(
        {
            nome: req.body.nome,
            cpf: req.body.cpf,
            cursos: req.body.cursos
        }
    );

    try {
        professor.save()
        res.status(201).send(professor.toJSON())
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar o professor.` })
    }
};

exports.addCurso = async function (req, res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Adiciona um curso ao professor'
    #swagger.parameters['id'] = { description: 'ID do professor' }
    */
    try {
        let professor = await Professor.findById(req.params.id)
        professor.cursos.push(req.body.cursos)

        await Professor.findByIdAndUpdate(req.params.id, professor)
        res.status(200).send(professor.toJSON())
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao adicionar o curso.` })
    }
};

exports.delCurso = async function (req,res) {
    /*
    #swagger.tags = ['Professor']
    #swagger.description = 'Deleta um curso de um professor pelo ID do curso'
    #swagger.parameters['id'] = { description: 'ID do professor' }
    */
    try{
        let professor = await Professor.findById(req.params.id)
        const index = professor.cursos.findIndex(x => x == req.body.cursos)

        professor.cursos.splice(index, 1)
        await Professor.findByIdAndUpdate(req.params.id, professor)
        res.status(200).send(professor.toJSON())
    }catch(err){
        res.status(500).send({ message: `${err.message} - falha ao remover o curso.` })
    }
};

