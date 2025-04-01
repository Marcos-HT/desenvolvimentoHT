document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os botões dentro da SEGUNDA seção de botões, que contém os botões da configuração de luz.
    const botoesLuz = document.querySelectorAll('.apresentacao__links__botoes-secao:nth-child(1) .apresentacao__links__navegacao');

    botoesLuz.forEach(botao => {
        botao.addEventListener('click', function() {
            // Mapeia os nomes dos botões para os endpoints corretos
            const endpointMapLuz = {
                'On': 'turn_on',
                'Off': 'turn_off',
                'Status': 'status',
                'Update': 'update'
            };
            const endpoint = endpointMapLuz[this.textContent.trim()]; // Obtém o endpoint correspondente ao texto do botão

            if (endpoint) {
                let url = 'http://192.168.10.108:81/' + endpoint; // URL base para os botões de luz

                // Se o botão for "Update", use um IP/URL diferente (SE NECESSÁRIO)
                if (endpoint === 'update') {
                    url = 'http://192.168.10.108:8080/update'; // Substitua pelo IP/Porta correto para o botão Update (se diferente)
                }

                // Faz a requisição HTTP (fetch)
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição: ' + response.status);
                        }
                        return response.text(); // Obtém o corpo da resposta como texto
                    })
                    .then(data => {
                        // Aplica um efeito visual de "clique" ao botão
                        this.classList.add('clicked');
                        setTimeout(() => {
                            this.classList.remove('clicked');
                        }, 300);

                        console.log(data); // Exibe os dados da resposta no console (para fins de depuração)
                    })
                    .catch(error => {
                        console.error('Erro:', error); // Exibe erros no console
                    });
            } else {
                console.error("Endpoint não encontrado para o botão:", this.textContent.trim()); // Exibe um erro se o endpoint não for encontrado
            }
        });
    });
});