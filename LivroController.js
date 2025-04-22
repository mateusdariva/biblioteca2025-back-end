import Livro from "../model/LivroModel.js";
import Emprestimo from "../model/EmprestimoModel.js";
import Devolucao from "../model/DevolucaoModel.js";

async function listar(req, res) {
    const respostaBanco = await Livro.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Livro.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Livro.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const titulo = req.body.titulo;
    const edicao = req.body.edicao;
    const paginas = req.body.paginas;
    const publicacao = req.body.publicacao;
    const foto = req.body.foto;
    const localizacao = req.body.localizacao;
    const resumo = req.body.resumo;
    const ativo = req.body.ativo;
    const condicaofisica = req.body.condicaofisica;
    const ideditora = req.body.ideditora;
    const idcatagoria = req.body.idcatagoria;

    const idlivro = req.params.id;

    const respostaBanco = await Livro.update(
        { titulo, edicao, paginas, publicacao, foto, localizacao, resumo, ativo, condicaofisica, ideditora, idcatagoria },
        { where: { idlivro } });
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const idlivro = req.params.id;

    const respostaBanco = await Livro.destroy({ where: { idlivro } });
    res.json(respostaBanco);
};

const listardisponiveis = async (req, res) => {
    try {
        const idlivro = await Livro.findAll({
            where: {
                ativo: true
            },
            include: [
                {
                    model: Emprestimo,
                    required: false,
                    include: [
                        {
                            model: Devolucao,
                            required: false
                        }
                    ]
                }
            ]
        });

        const disponiveis = idlivro.filter(livro => {
            if (!livro.emprestimos || livro.emprestimos.length === 0) return true;

            return livro.emprestimos.every(emp => emp.devolucao);
        });

        res.status(200).json(disponiveis);
    } catch (error) {
        console.error('Erro ao buscar livros disponíveis:', error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};



export default { listar, selecionar, inserir, alterar, excluir, listardisponiveis};



