// Importa o Mongoose, que é uma biblioteca para modelar objetos MongoDB
import mongoose from 'mongoose';

// Define um esquema (Schema) para os documentos da coleção "produtos"
const produtosSchema = new mongoose.Schema({
    nome: { type: String, required: true },        // Campo "nome" do tipo String, obrigatório
    descricao: { type: String, required: true },   // Campo "descrição" do tipo String, obrigatório
    preco: { type: Number, required: true },    // Campo "preço" do tipo Number, obrigatório
    quantidade_em_estoque: { type: Number, required: true },  // Campo "quantidade" do tipo Number, obrigatório
    created_at: { type: Date, default: Date.now }, // Adiciona o campo created_at com a data atual
    updated_at: { type: Date, default: null } //Adiciona o campo updated_at para listar caso haja alguma modificação do produto
});

// Cria um modelo (Model) chamado "Produtos" usando o esquema definido anteriormente
const Produtos = mongoose.model('Produtos', produtosSchema);

// Exporta o modelo "Produto" para que possa ser importado e utilizado em outros arquivos do aplicativo
export default Produtos;