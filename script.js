        // --- Seleção de Elementos do DOM ---
        // Obtém a referência para o campo de input onde o usuário digita a nova tarefa.
        const novaTarefaInput = document.getElementById('novaTarefaInput');
        // Obtém a referência para o botão de adicionar tarefa.
        const adicionarTarefaBtn = document.getElementById('adicionarTarefaBtn');
        // Obtém a referência para a lista (UL) onde as tarefas serão exibidas.
        const listaDeTarefasUL = document.getElementById('listaDeTarefas');

        // --- Armazenamento de Dados ---
        // Array para armazenar todas as tarefas.
        // Inicialmente, tenta carregar as tarefas do localStorage. Se não houver, inicia com um array vazio.
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        // --- Funções Auxiliares ---

        /**
         * Salva o array de tarefas no localStorage do navegador.
         * Isso permite que as tarefas persistam mesmo após o navegador ser fechado.
         */
        function salvarTarefas() {
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }

        /**
         * Renderiza (exibe) todas as tarefas presentes no array 'tarefas' na interface HTML.
         * Esta função é responsável por atualizar a lista na tela.
         */
        function renderizarTarefas() {
            // Limpa o conteúdo atual da lista UL para evitar duplicação ao renderizar novamente.
            listaDeTarefasUL.innerHTML = '';

            // Verifica se há tarefas para exibir
            if (tarefas.length === 0) {
                const liVazia = document.createElement('li');
                liVazia.className = 'text-gray-500 italic text-center py-4';
                liVazia.textContent = 'Nenhuma tarefa adicionada ainda.';
                listaDeTarefasUL.appendChild(liVazia);
                return; // Sai da função se não houver tarefas
            }

            // Itera sobre cada tarefa no array 'tarefas' usando um laço forEach.
            // Para cada tarefa, cria um novo elemento LI e o adiciona à lista UL.
            tarefas.forEach((tarefaTexto, index) => {
                // Cria um novo item de lista (LI) para a tarefa.
                const li = document.createElement('li');
                // Adiciona classes Tailwind para estilização do item da lista.
                li.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200';

                // Cria um elemento SPAN para exibir o texto da tarefa.
                const spanTarefa = document.createElement('span');
                spanTarefa.textContent = tarefaTexto;
                spanTarefa.className = 'text-gray-800 break-words'; // Permite quebra de linha para textos longos

                // Cria um botão para remover a tarefa.
                const removerBtn = document.createElement('button');
                removerBtn.textContent = 'Remover';
                // Adiciona classes Tailwind para estilização do botão de remover.
                removerBtn.className = 'btn-remover'; // Classe definida no <style> para reuso

                // Adiciona um 'data-index' ao botão para saber qual tarefa remover quando clicado.
                removerBtn.dataset.index = index;

                // Adiciona um 'event listener' ao botão de remover.
                // Quando o botão é clicado, a função 'removerTarefa' é chamada com o índice da tarefa.
                removerBtn.addEventListener('click', (event) => {
                    // Obtém o índice da tarefa a ser removida a partir do atributo 'data-index'.
                    const indexParaRemover = parseInt(event.target.dataset.index);
                    removerTarefa(indexParaRemover);
                });

                // Adiciona o texto da tarefa e o botão de remover ao item da lista (LI).
                li.appendChild(spanTarefa);
                li.appendChild(removerBtn);

                // Adiciona o item da lista (LI) à lista principal (UL).
                listaDeTarefasUL.appendChild(li);
            });
        }

        /**
         * Adiciona uma nova tarefa ao array 'tarefas' e atualiza a interface.
         */
        function adicionarTarefa() {
            // Obtém o texto do input e remove espaços em branco do início e fim.
            const textoTarefa = novaTarefaInput.value.trim();

            // Validação: Verifica se o texto da tarefa não está vazio.
            if (textoTarefa === '') {
                // Exibe uma mensagem simples se a tarefa estiver vazia.
                // IMPORTANTE: Em um ambiente real, você usaria um modal ou uma notificação na tela.
                // Como alert() não é permitido, vamos apenas focar no console para este exemplo.
                console.warn('Não é possível adicionar uma tarefa vazia.');
                novaTarefaInput.value = ''; // Limpa o input mesmo se for vazio
                return; // Sai da função se a tarefa for vazia
            }

            // Adiciona a nova tarefa ao final do array 'tarefas'.
            tarefas.push(textoTarefa);
            // Salva as tarefas no localStorage.
            salvarTarefas();
            // Limpa o campo de input após adicionar a tarefa.
            novaTarefaInput.value = '';
            // Re-renderiza a lista para exibir a nova tarefa.
            renderizarTarefas();
        }

        /**
         * Remove uma tarefa do array 'tarefas' dado o seu índice e atualiza a interface.
         * @param {number} index - O índice da tarefa a ser removida no array.
         */
        function removerTarefa(index) {
            // Remove a tarefa do array usando o método splice.
            // O primeiro argumento é o índice de onde começar a remover, o segundo é quantos elementos remover.
            tarefas.splice(index, 1);
            // Salva as tarefas atualizadas no localStorage.
            salvarTarefas();
            // Re-renderiza a lista para refletir a remoção.
            renderizarTarefas();
        }

        // --- Event Listeners ---
        // Adiciona um 'event listener' ao botão de adicionar tarefa.
        // Quando o botão é clicado, a função 'adicionarTarefa' é chamada.
        adicionarTarefaBtn.addEventListener('click', adicionarTarefa);

        // Adiciona um 'event listener' ao campo de input para permitir adicionar tarefa com a tecla 'Enter'.
        novaTarefaInput.addEventListener('keypress', (event) => {
            // Verifica se a tecla pressionada foi 'Enter' (código 13).
            if (event.key === 'Enter') {
                adicionarTarefa();
            }
        });

        // --- Inicialização ---
        // Chama a função 'renderizarTarefas' uma vez quando a página é carregada.
        // Isso garante que as tarefas salvas no localStorage sejam exibidas ao carregar a página.
        document.addEventListener('DOMContentLoaded', renderizarTarefas);