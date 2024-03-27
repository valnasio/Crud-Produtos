import { Router } from "express";
import { atualizarProduto, criarProduto, deletarProduto, listarProdutos } from './controlers/ProdutosController.js';

const routes = Router();

//Rota base para validar aplicação
routes.get('/', (req, res) => {
    res.json({ msg: 'API rodando!' });
});

//Rotas do Produtos Controller
routes.get('/produtos', listarProdutos);
routes.post('/produtos', criarProduto);
routes.put('/produtos/:id', atualizarProduto);
routes.delete('/produtos/:id', deletarProduto);

export default routes;