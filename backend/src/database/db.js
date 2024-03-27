// Importa a biblioteca mongoose para interagir com o MongoDB
import mongoose from "mongoose"

// Função que conecta ao banco de dados MongoDB
async function connectDataBase() {
    // Conecta ao banco de dados MongoDB utilizando a string de conexão
    await mongoose.connect('mongodb+srv://root:112233445566@tapegandofogobixo.fy5u5vt.mongodb.net/crud_unifan?retryWrites=true&w=majority&appName=tapegandofogobixo', {
    })
}

// Exporta a função para poder utilizá-la em outros locais do projeto (no index.js)
export default connectDataBase