/**
 * Função para lidar com o evento de envio do formulário de novo pedido.
 */
async function adicionarNovoPedido(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dadosPedido = {
        nome: formData.get('nome'),
        descricao: formData.get('descricao'),
        preco: parseFloat(formData.get('preco')),
        quantidade_em_estoque: parseInt(formData.get('quantidade'))
    };

    try {
        const response = await fetch('http://localhost:5000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPedido)
        });

        if (response.ok) {
            Swal.fire('Sucesso!', 'Novo pedido adicionado com sucesso.', 'success').then(() => {
                window.open('../../index.html', '_blank');
            });
        } else {
            throw new Error('Erro ao adicionar novo pedido.');
        }
    } catch (error) {
        console.error('Erro ao adicionar novo pedido:', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao tentar adicionar o novo pedido.', 'error');
    }
}

/**
 * Event listener para o formulário de novo pedido.
 */
const formNovoPedido = document.getElementById('form-novo-pedido');
formNovoPedido.addEventListener('submit', adicionarNovoPedido);
