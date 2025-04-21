import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import Usuario from "../model/UsuarioModel.js";
import moment from 'moment';

async function listar (req, res) {
    const respostaBanco = await Emprestimo.findAll();
    res.json(respostaBanco);
}

async function selecionar (req, res) {
    const id = req.params.id;
    const respostaBanco = await Emprestimo.findByPk(id);
    res.json(respostaBanco);
}

async function emprestar (req, res) {
    //Lendo os parametros
    const idlivro = req.body.idlivro;
    const idusuario = req.body.idusuario;

    //verifica se existe o parametro idlivro
    if (!idlivro){
        res.status(422).send('O parâmetro idlivro é obrigatório.');
    }

    //verifica se existe o parametro idusuario
    if (!idusuario){
        res.status(422).send('O parâmetro idusuario é obrigatório.');
    }

    //verifica se o livro existe
    const livroBanco = await Livro.findByPk(idlivro);
    if (!livroBanco){
        res.status(404).send('Livro não encontrado.');
    }

    const usuarioBanco = await Usuario.findByPk(idusuario);
    if (!usuarioBanco){
        res.status(404).send('Usuário não encontrado.');
    }

    //Verifica se o campo esta inativo
    if(!livroBanco.ativo){
        res.status(422).send('Este livro está inativo.');
    }

    if(livroBanco.emprestado){
        res.status(422).send('Este livro já está emprestado.');
    }

    //verifica de o usuário tem um empréstimo pendendente
    //falta fazer

    //setando data de emprestimo e data de vencimento
    const emprestimo = moment().format('YYYY-MM-DD');
    const vencimento = moment().add(15, 'days').format('YYYY-MM-DD');
    
    //insetindo o emprestimo no banco
    const respostaBanco = await Emprestimo.create({idlivro, idusuario, emprestimo, vencimento});
    
    //alterando o campo emprestado do livro para true
    const emprestado = true;
    await Livro.update(
        { emprestado},
        { where: { idlivro } });
    
    res.json(respostaBanco);


    //const respostaBanco = await Emprestimo.create(req.body);
    //res.json(respostaBanco);
}



async function devolver (req, res) {
    const nomeautor = req.body.nomeautor;
    const nascimento = req.body.nascimento;
    const biografia = req.body.biografia;
    const nacionalidade = req.body.nacionalidade;
    const foto = req.body.foto;


    const idautor = req.params.id;

    const respostaBanco = await Emprestimo.update(
        { nomeautor, nascimento, biografia, nacionalidade, foto },
        { where: { idautor } });
    res.json(respostaBanco);
}


export default {listar, selecionar, emprestar, devolver};