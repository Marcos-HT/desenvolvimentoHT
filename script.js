document.addEventListener('DOMContentLoaded', function() {
    const botoes = document.querySelectorAll('.apresentacao__links__navegacao');

    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const endpointMap = {
                'Ligar': 'turn_on',
                'Desligar': 'turn_off',
                'Status': 'status',
                'Update': 'update'
            };
            const endpoint = endpointMap[this.textContent.trim()];

            if (endpoint) {
                const url = 'http://192.168.10.108:81/' + endpoint;
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição: ' + response.status);
                        }
                        return response.text();
                    })
                    .then(data => {
                        // Adiciona a classe temporária para o efeito visual
                        this.classList.add('clicked');
                        setTimeout(() => {
                            this.classList.remove('clicked');
                        }, 300); // Remove a classe após 300ms
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