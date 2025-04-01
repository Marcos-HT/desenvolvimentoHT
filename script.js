document.addEventListener('DOMContentLoaded', function() {
    const botoes = document.querySelectorAll('.apresentacao__links__navegacao');

    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const endpointMap = {
                'Ligar': 'turn_on',
                'Desligar': 'turn_off',
                'Status': 'status',
                'Update': 'update',
                'Novo 1': 'novo1',
                'Novo 2': 'novo2',
                'Novo 3': 'novo3',
                'Novo 4': 'novo4'
            };
            const endpoint = endpointMap[this.textContent.trim()];

            if (endpoint) {
                const url = 'http://SEU_ENDERECO_PUBLICO/' + endpoint; // Substitua pelo endereço público
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição: ' + response.status);
                        }
                        return response.text();
                    })
                    .then(data => {
                        this.classList.add('clicked');
                        setTimeout(() => {
                            this.classList.remove('clicked');
                        }, 300);
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
            } else {
                console.error("Endpoint não encontrado para o botão:", this.textContent.trim());
            }
        });
    });
});