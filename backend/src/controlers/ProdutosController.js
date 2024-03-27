import Produtos from '../models/Produtos.js'; // Importa o modelo de Produtos

//Método para listar todos os produtos cadastrados.
export const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produtos.find(); // Busca todos os produtos no banco de dados
        if (produtos.length === 0) { // Se nenhum produto for encontrado
            return res.status(404).json({ message: 'Nenhum produto encontrado na base de dados.' });
        }
        res.status(200).json(produtos); // Retorna os produtos encontrados
    } catch (error) {
        res.status(500).json({ message: error.message }); // Retorna mensagem de erro caso ocorra um erro no servidor
    }
};

//Método para criar um novo produto.
export const criarProduto = async (req, res) => {
    const { nome, descricao, preco, quantidade_em_estoque } = req.body; // Extrai os dados do corpo da requisição
    const novoProduto = new Produtos({ // Cria um novo objeto de Produto
        nome,
        descricao,
        preco,
        quantidade_em_estoque,
        created_at: new Date() // Adiciona a data de criação
    });

    try {
        const produtoSalvo = await novoProduto.save(); // Salva o novo produto no banco de dados
        res.status(201).json(produtoSalvo); // Retorna o produto criado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Retorna mensagem de erro caso ocorra um erro no servidor
    }
};

// Método para atualizar um produto com base no ID fornecido.
export const atualizarProduto = async (req, res) => {
    const { id } = req.params; // Obtém o ID do produto a ser atualizado da URL da requisição
    const { nome, descricao, preco, quantidade_em_estoque } = req.body; // Extrai os dados atualizados do corpo da requisição

    try {
        const produtoAtualizado = await Produtos.findByIdAndUpdate(
            id,
            {
                $set: {
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    quantidade_em_estoque: quantidade_em_estoque,
                    updated_at: new Date() // Adiciona a data de atualização
                }
            },
            { new: true } // Para retornar o documento atualizado
        );

        if (!produtoAtualizado) { // Se nenhum produto for encontrado com o ID fornecido
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        res.status(200).json(produtoAtualizado); // Retorna o produto atualizado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Retorna mensagem de erro caso ocorra um erro no servidor
    }
};


//Método para deletar um produto com base no ID fornecido.
export const deletarProduto = async (req, res) => {
    const { id } = req.params; // Obtém o ID do produto a ser deletado da URL da requisição

    try {
        const produtoDeletado = await Produtos.findByIdAndDelete(id); // Busca e deleta o produto no banco de dados
        if (!produtoDeletado) { // Se nenhum produto for encontrado com o ID fornecido
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso.' }); // Retorna mensagem de sucesso
    } catch (error) {
        res.status(500).json({ message: error.message }); // Retorna mensagem de erro caso ocorra um erro no servidor
    }
};