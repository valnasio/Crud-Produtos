/**
 * Função para preencher o formulário de edição com os dados do pedido existente.
 */
async function preencherFormularioEdicao() {
    const params = new URLSearchParams(window.location.search);
    const idPedido = params.get('id');

    try {
        // Realiza uma solicitação para obter todos os pedidos
        const response = await fetch('http://localhost:5000/produtos');
        const pedidos = await response.json();

        // Encontra o pedido com o ID correspondente
        const pedido = pedidos.find(pedido => pedido._id === idPedido);

        if (pedido) {
            // Preenche o formulário com os detalhes do pedido encontrado
            document.getElementById('nome').value = pedido.nome;
            document.getElementById('descricao').value = pedido.descricao;
            document.getElementById('preco').value = pedido.preco;
            document.getElementById('quantidade').value = pedido.quantidade_em_estoque;
        } else {
            // Se não encontrar o pedido correspondente, exibe uma mensagem de erro
            throw new Error('Pedido não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao preencher formulário de edição:', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao tentar preencher o formulário de edição.', 'error');
    }
}

/**
 * Função para lidar com o evento de envio do formulário de edição de pedido.
 */
async function editarPedido(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const idPedido = new URLSearchParams(window.location.search).get('id');
    const dadosPedido = {
        nome: formData.get('nome'),
        descricao: formData.get('descricao'),
        preco: parseFloat(formData.get('preco')),
        quantidade_em_estoque: parseInt(formData.get('quantidade'))
    };

    try {
        const response = await fetch(`http://localhost:5000/produtos/${idPedido}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPedido)
        });

        if (response.ok) {
            Swal.fire('Sucesso!', 'Pedido editado com sucesso.', 'success').then(() => {
                window.open('../../index.html', '_blank');
            });
        } else {
            throw new Error('Erro ao editar pedido.');
        }
    } catch (error) {
        console.error('Erro ao editar pedido:', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao tentar editar o pedido.', 'error');
    }
}

/**
 * Event listener para o formulário de edição de pedido.
 */
const formEditarPedido = document.getElementById('form-editar-pedido');
formEditarPedido.addEventListener('submit', editarPedido);

// Preenche o formulário com os dados do pedido existente ao carregar a página
preencherFormularioEdicao();
