/**
 * Função para carregar os pedidos da API e exibi-los na tabela.
 */
async function carregarProdutos() {
    try {
        // Realiza uma solicitação para obter os pedidos da API
        const response = await fetch('http://localhost:5000/produtos');
        // Extrai os pedidos do JSON retornado pela API
        const produtos = await response.json();
        // Exibe os pedidos na tabela
        mostrarPedidos(produtos);
    } catch (error) {
        // Em caso de erro, registra o erro no console
        console.error('Erro ao carregar os produtos:', error);
    }
}

/**
 * Função para exibir os pedidos na tabela.
 */
function mostrarPedidos(produtos) {
    // Obtém o corpo da tabela
    const tbody = document.querySelector('#tabela-pedidos tbody');
    // Limpa o conteúdo da tabela antes de adicionar os novos dados
    tbody.innerHTML = '';
    // Itera sobre cada pedido e cria uma linha na tabela para cada um
    produtos.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${produto.preco}$</td>
            <td>${produto.quantidade_em_estoque}</td>
            <td id="ações">
                <button class="editar-produto" id="editar-produto" data-id="${produto._id}">Editar</button>
                <button class="excluir-produto" data-id="${produto._id}">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Função para lidar com o evento de clique no botão de edição de produto.
 */
async function editarProduto(event) {
    // Extrai o ID do produto a partir do atributo data-id do botão
    const idProduto = event.target.dataset.id;
    if (idProduto) {
        // Redireciona para a página de edição de pedidos com o ID do pedido como parâmetro na URL
        window.open(`./pages/editar-pedido/index.html?id=${idProduto}`, '_blank');
    }
}

/**
 * Função para lidar com o evento de clique no botão de exclusão de pedido.
 */
async function excluirProduto(event) {
    // Extrai o ID do pedido a partir do atributo data-id do botão
    const idProduto = event.target.dataset.id;
    if (idProduto) {
        // Exibe uma caixa de diálogo de confirmação usando o SweetAlert2
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você está prestes a excluir este produto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                // Envia uma solicitação para excluir o pedido
                const response = await fetch(`http://localhost:5000/produtos/${idProduto}`, { method: 'DELETE' });
                // Extrai os dados da resposta da API
                const data = await response.json();
                // Exibe uma mensagem de sucesso
                Swal.fire('Excluído!', 'O pedido foi excluído com sucesso.', 'success');
                carregarProdutos();
            } catch (error) {
                // Em caso de erro, exibe uma mensagem de erro
                console.error('Erro ao excluir o pedido:', error);
                Swal.fire('Erro!', 'Ocorreu um erro ao tentar excluir o pedido.', 'error');
            }
        }
    }
}

// Event listener para os botões de exclusão e confirmação de produto
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('editar-produto')) {
        editarProduto(event);
    } else if (event.target.classList.contains('excluir-produto')) {
        excluirProduto(event);
    }
});

// Ao carregar a página, carrega os pedidos da API
carregarProdutos();