var Usuario = require('../models/usuarioModel')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.create = async function(req, res){
    /*
       #swagger.tags = ['Usuario']
       #swagger.description = 'Insere um novo usuário'
       */
    //Criptografando a senha
    //genSalt => impede que 2 senhas iguais tenham resultados iguais
    const salt = await bcrypt.genSalt(10)
    req.body.senha = await bcrypt.hash(req.body.senha, salt)

    let usuario = new Usuario(
        {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
    );

    try{
        usuario.save().then(result => res.status(201).send(result))
    }catch(err){
        err => res.status(400).json(err)
    }
};

exports.logar = async function (req, res) {
        /*
       #swagger.tags = ['Usuario']
       #swagger.description = 'Verifica Login e Senha do usuário cadastrado e realiza o login'
       */


    const { email, senha } = req.body
    try {

        let usuario = await Usuario.findOne({email:email})

        if (!usuario)
            return res.status(404).json({//Not found
                errors: [{
                    value: `${email}`,
                    msg: `O email ${email} não está cadastrado!`,
                    param: 'email'
                }]
            })

        const isMatch = await bcrypt.compare(senha, usuario.senha)
        if (!isMatch)
            return res.status(403).json({
                errors: [{
                    value: 'senha',
                    msg: 'A senha informada está incorreta',
                    param: 'senha'
                }]
            })

        jwt.sign(
            { usuario: { id: usuario._id } },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRES_IN },
            (err, token) => {
                if (err) throw err
                res.status(200).json({
                    access_token: token
                })
            }
        )
    } catch (e) {
        console.error(e)
    }
};

exports.cadastro = function (req, res){
        /*
       #swagger.tags = ['Usuario']
       #swagger.description = 'Direciona o usuário para a página de cadastro'
       */
    res.render('cadastrar')
};

exports.login = function (req, res){
        /*
       #swagger.tags = ['Usuario']
       #swagger.description = 'Direciona o usuário para a página do Login'
       */
    res.render('login')
};