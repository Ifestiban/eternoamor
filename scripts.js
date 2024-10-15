// Função para abrir o modal de adicionar casal
document.getElementById("showFormBtn").addEventListener("click", () => {
    const form = document.getElementById("addCoupleForm");
    form.style.display = "block"; // Mostra o formulário
});

// Função para fechar o formulário
document.getElementById("closeFormBtn").addEventListener("click", () => {
    const form = document.getElementById("addCoupleForm");
    form.style.display = "none"; // Oculta o formulário
});

// Função para adicionar casal
document.getElementById("addCoupleBtn").addEventListener("click", () => {
    const nomeEle = document.getElementById("nomeEle").value;
    const nomeEla = document.getElementById("nomeEla").value;

    if (nomeEle && nomeEla) {
        adicionarCasal(nomeEle, nomeEla);
        limparFormulario();
        fecharFormulario();
    } else {
        alert("Por favor, preencha os campos 'Nome Ele' e 'Nome Ela'.");
    }
});

// Função para adicionar casal na lista e salvar no localStorage
function adicionarCasal(nomeEle, nomeEla) {
    const casais = JSON.parse(localStorage.getItem("casais")) || [];
    const novoCasal = { nomeEle: nomeEle, nomeEla: nomeEla };

    // Adiciona o novo casal à lista e salva no localStorage
    casais.push(novoCasal);
    localStorage.setItem("casais", JSON.stringify(casais));

    // Exibe a mensagem de confirmação
    alert(`Casal ${nomeEle} e ${nomeEla} adicionado com sucesso!`);

    // Atualiza a exibição dos casais
    renderizarCasais();
}

// Função para exibir a lista de casais no modal
function renderizarCasais() {
    const coupleTableBody = document.getElementById("coupleTableBody");
    coupleTableBody.innerHTML = ""; // Limpa a tabela

    const casais = JSON.parse(localStorage.getItem("casais")) || []; // Puxa casais do localStorage

    casais.forEach(casal => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${casal.nomeEle}</td><td>${casal.nomeEla}</td>`;
        coupleTableBody.appendChild(row);
    });
}

// Função para abrir o modal da lista de casais
document.getElementById("openCouplesModalBtn").addEventListener("click", () => {
    renderizarCasais(); // Atualiza a lista de casais ao abrir o modal
    document.getElementById("couplesModal").style.display = "block"; // Mostra o modal
});

// Fechar o modal ao clicar no "x"
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("couplesModal").style.display = "none"; // Oculta o modal
});

// Função para abrir o modal de adicionar entrada
document.getElementById("openModalBtn").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block"; // Mostra o modal de entrada
    filterCouples(); // Atualiza a lista de casais no filtro ao abrir o modal
});

// Fechar o modal de entrada ao clicar no botão de fechar
document.getElementById("closeModalBtn").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none"; // Oculta o modal de entrada
});


// Função para filtrar casais
function filterCouples() {
    const filterInput = document.getElementById('coupleFilter');
    const filter = filterInput.value.toLowerCase(); // Obtenha o valor do filtro
    const filteredCoupleList = document.getElementById('filteredCoupleList');
    filteredCoupleList.innerHTML = ''; // Limpa a lista de filtro

    // Obtém os casais do localStorage
    const casais = JSON.parse(localStorage.getItem("casais")) || [];

    // Verifica se a lista de casais não está vazia
    if (casais.length === 0) {
        console.warn("Não há casais no localStorage.");
        return; // Retorna se não houver casais
    }

    // Filtra os casais
    casais.filter(casal => {
        // Verifica se as propriedades existem antes de chamar toLowerCase()
        const nomeEle = casal.nomeEle ? casal.nomeEle.toLowerCase() : '';
        const nomeEla = casal.nomeEla ? casal.nomeEla.toLowerCase() : '';

        // Verifica se o filtro está presente nos nomes
        return nomeEle.includes(filter) || nomeEla.includes(filter);
    }).forEach(casal => {
        const option = document.createElement('option');
        option.value = `${casal.nomeEle} / ${casal.nomeEla}`; // Corrigido para usar "/" em vez de "&"
        option.textContent = `${casal.nomeEle} / ${casal.nomeEla}`; // Corrigido para usar "/" em vez de "&"
        filteredCoupleList.appendChild(option); // Adiciona a opção à lista filtrada
    });
}


// Função para limpar os campos do formulário
function limparFormulario() {
    document.getElementById("nomeEle").value = "";
    document.getElementById("nomeEla").value = "";
}

// Função para fechar o formulário após adicionar o casal
function fecharFormulario() {
    const form = document.getElementById("addCoupleForm");
    form.style.display = "none"; // Oculta o formulário após adicionar o casal
}

// Função para carregar os casais salvos ao carregar a página
window.onload = function() {
    renderizarCasais(); // Chama a função ao carregar a página
};

// Mostrar e esconder o formulário de despesa
document.getElementById("openExpenseFormBtn").addEventListener("click", () => {
    document.getElementById("addExpenseForm").style.display = "block"; // Mostra o formulário
});

document.getElementById("closeExpenseFormBtn").addEventListener("click", () => {
    document.getElementById("addExpenseForm").style.display = "none"; // Esconde o formulário
});

// Função para adicionar despesa
document.getElementById("addExpenseBtn").addEventListener("click", () => {
    const razaoSocial = document.getElementById("razaoSocial").value;
    const cnpj = document.getElementById("cnpj").value;
    const dataCompra = document.getElementById("dataCompra").value;
    const numeroDocumento = document.getElementById("numeroDocumento").value;
    const valorCompra = document.getElementById("valorCompra").value;
    const chaveAcesso = document.getElementById("chaveAcesso").value;
    const descricaoCompra = document.getElementById("descricaoCompra").value;

    if (razaoSocial && cnpj && dataCompra && numeroDocumento && valorCompra && chaveAcesso && descricaoCompra) {
        adicionarDespesa(razaoSocial, cnpj, dataCompra, numeroDocumento, valorCompra, chaveAcesso, descricaoCompra);
        limparFormularioDespesa();
        alert("Despesa adicionada com sucesso!"); // Mensagem de confirmação
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Função para adicionar despesa na lista e salvar no localStorage
function adicionarDespesa(razaoSocial, cnpj, dataCompra, numeroDocumento, valorCompra, chaveAcesso, descricaoCompra) {
    const despesas = JSON.parse(localStorage.getItem("despesas")) || [];
    const novaDespesa = { razaoSocial, cnpj, dataCompra, numeroDocumento, valorCompra, chaveAcesso, descricaoCompra };

    despesas.push(novaDespesa);
    localStorage.setItem("despesas", JSON.stringify(despesas));

    renderizarDespesas(); // Atualiza a lista de despesas após adicionar uma nova
}

// Função para renderizar as despesas
function renderizarDespesas() {
    const container = document.getElementById("despesasContainer");
    if (!container) {
        console.error("Elemento despesasContainer não encontrado");
        return;
    }

    const despesas = JSON.parse(localStorage.getItem("despesas")) || [];
    container.innerHTML = ""; // Limpa o conteúdo anterior

    despesas.forEach(despesa => {
        const despesaItem = document.createElement("div");
        despesaItem.innerHTML = `
            <p>Razão Social: ${despesa.razaoSocial}</p>
            <p>CNPJ: ${despesa.cnpj}</p>
            <p>Data da Compra: ${despesa.dataCompra}</p>
            <p>Número do Documento: ${despesa.numeroDocumento}</p>
            <p>Valor da Compra: R$ ${parseFloat(despesa.valorCompra).toFixed(2)}</p>
            <p>Chave de Acesso: ${despesa.chaveAcesso}</p>
            <p>Descrição: ${despesa.descricaoCompra}</p>
            <hr>
        `;
        container.appendChild(despesaItem);
    });
}

// Função para limpar o formulário de despesas
function limparFormularioDespesa() {
    document.getElementById("razaoSocial").value = "";
    document.getElementById("cnpj").value = "";
    document.getElementById("dataCompra").value = "";
    document.getElementById("numeroDocumento").value = "";
    document.getElementById("valorCompra").value = "";
    document.getElementById("chaveAcesso").value = "";
    document.getElementById("descricaoCompra").value = "";
    document.getElementById("addExpenseForm").style.display = "none"; // Esconde o formulário após a adição
}

// Inicializa a renderização das despesas ao carregar a página
window.onload = renderizarDespesas;


// Mostrar e esconder modais
document.getElementById("showFormBtn").addEventListener("click", () => {
    document.getElementById("addCoupleForm").style.display = "block"; // Mostra o formulário de casal
});

document.getElementById("closeFormBtn").addEventListener("click", () => {
    document.getElementById("addCoupleForm").style.display = "none"; // Esconde o formulário de casal
});

document.getElementById("openCouplesModalBtn").addEventListener("click", () => {
    document.getElementById("couplesModal").style.display = "block"; // Mostra o modal de casais
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("couplesModal").style.display = "none"; // Esconde o modal de casais
});

document.getElementById("openReportModalBtn").addEventListener("click", () => {
    document.getElementById("reportModal").style.display = "block"; // Mostra o modal de relatório
});

document.getElementById("closeReportModalBtn").addEventListener("click", () => {
    document.getElementById("reportModal").style.display = "none"; // Esconde o modal de relatório
});

document.getElementById("openModalBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block"; // Mostra o modal de entrada
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none"; // Esconde o modal de entrada
});

// Inicializa a renderização das despesas ao carregar a página
window.onload = renderizarDespesas;



// Função para abrir o modal de relatório
document.getElementById("openReportModalBtn").addEventListener("click", function() {
    document.getElementById("reportModal").style.display = "block"; // Mostra o modal de relatório
});

// Função para fechar o modal ao clicar no "X"
document.getElementById("closeReportModalBtn").addEventListener("click", function() {
    document.getElementById("reportModal").style.display = "none"; // Esconde o modal de relatório
});

// Função para gerar o relatório combinado de despesas e entradas
function gerarRelatorio(dataInicial, dataFinal, tipoRelatorio) {
    const reportTableBodyEntradas = document.getElementById("reportTableBodyEntradas");
    const reportTableBodySaidas = document.getElementById("reportTableBodySaidas");
    
    // Limpa as tabelas
    reportTableBodyEntradas.innerHTML = ""; 
    reportTableBodySaidas.innerHTML = ""; 

    // Puxa dados de despesas do localStorage
    const despesas = JSON.parse(localStorage.getItem("despesas")) || [];
    // Puxa dados de entradas do localStorage
    const entradas = JSON.parse(localStorage.getItem("entradas")) || [];

    // Variáveis para controle de visibilidade das tabelas
    let entradasVisiveis = false;
    let saídasVisiveis = false;

    // Filtra e preenche a tabela com os dados de entradas
    entradas.forEach(item => {
        const dataEntrada = new Date(item.data.split('/').reverse().join('-')); // Converte para YYYY-MM-DD
        if (dataEntrada >= dataInicial && dataEntrada <= dataFinal) {
            if (tipoRelatorio === 'todos' || tipoRelatorio === 'entradas') {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${item.data}</td><td>${item.casal}</td><td>R$ ${item.valor}</td>`;
                reportTableBodyEntradas.appendChild(row);
                entradasVisiveis = true;
            }
        }
    });

    // Filtra e preenche a tabela com os dados de saídas
    despesas.forEach(item => {
        const dataSaida = new Date(item.dataCompra.split('/').reverse().join('-')); // Converte para YYYY-MM-DD
        if (dataSaida >= dataInicial && dataSaida <= dataFinal) {
            if (tipoRelatorio === 'todos' || tipoRelatorio === 'saidas') {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${item.dataCompra}</td><td>${item.razaoSocial}</td><td>R$ ${item.valorCompra}</td>`;
                reportTableBodySaidas.appendChild(row);
                saídasVisiveis = true;
            }
        }
    });

    // Exibe as tabelas conforme o tipo selecionado
    document.getElementById("reportTableEntradas").style.display = entradasVisiveis ? "table" : "none";
    document.getElementById("reportTableSaidas").style.display = saídasVisiveis ? "table" : "none";
}

// Evento do botão de consultar relatório
document.getElementById("consultarRelatorioBtn").addEventListener("click", function() {
    const dataInicial = new Date(document.getElementById("dataInicial").value);
    const dataFinal = new Date(document.getElementById("dataFinal").value);
    const tipoRelatorio = document.getElementById("tipoRelatorio").value;

    // Verifica se as datas são válidas
    if (dataInicial && dataFinal && dataInicial <= dataFinal) {
        gerarRelatorio(dataInicial, dataFinal, tipoRelatorio); // Chama a função para gerar o relatório
    } else {
        alert("Por favor, insira datas válidas.");
    }
});

// Função para gerar a impressão do relatório
function imprimirRelatorio() {
    // Pega o conteúdo do relatório
    const reportContent = document.getElementById("reportContent").innerHTML;

    // Cria uma nova janela para a impressão
    const novaJanela = window.open('', '_blank');

    // Escreve o conteúdo do relatório com a formatação de impressão
    novaJanela.document.write(`
        <html>
        <head>
            <title>Relatório de Entradas e Saídas</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1, h2, h3 { text-align: center; }
                h1 { font-size: 28px; margin-bottom: 10px; }
                h2 { font-size: 22px; margin-top: 5px; }
                h3 { font-size: 20px; margin-top: 20px; }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }

                .logo {
                    max-width: 200px;
                    display: block;
                    margin: 0 auto 20px;
                }

                .section {
                    margin-bottom: 40px;
                }
            </style>
        </head>
        <body>
            
            <img src="imagens/imagem romantica.jpg" alt="Logo" class="logo">
            <h1>Relatório de Entradas e Saídas</h1>
            
            <div class="section">
                <h2>Entradas</h2>
                ${document.getElementById('reportTableEntradas').outerHTML}
            </div>

            <div class="section">
                <h2>Saídas</h2>
                ${document.getElementById('reportTableSaidas').outerHTML}
            </div>

            <script>
                window.print();
            </script>
        </body>
        </html>
    `);

    // Fecha o documento da nova janela
    novaJanela.document.close();
}

// Adiciona o evento ao botão de impressão
document.getElementById("printReportBtn").addEventListener("click", imprimirRelatorio);




// Função para gerar e mostrar o recibo
function gerarRecibo(casal, valor) {
    const reciboModal = document.getElementById("reciboModal");
    const reciboBody = document.getElementById("reciboBody");

    // Limpa o conteúdo anterior
    reciboBody.innerHTML = `
        <h2>Recibo de Pagamento</h2>
        <p><strong>Nome do Casal:</strong> ${casal}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Valor Pago:</strong> R$ ${valor}</p>
        <p>Agradecemos pela sua contribuição!</p>
        <p><strong>Número do Recibo:</strong> ${numeroRecibo}</p>
    `;

    // Incrementa o número do recibo para a próxima entrada
    numeroRecibo++;

    // Mostra o modal do recibo
    reciboModal.style.display = "block";
}

// Função para imprimir o recibo
document.getElementById("printReciboBtn").addEventListener("click", function() {
    window.print(); // Chama a impressão do recibo atual
});

// Função para fechar o modal do recibo
document.getElementById("closeReciboModalBtn").addEventListener("click", function() {
    document.getElementById("reciboModal").style.display = "none"; // Oculta o modal do recibo
});

// Função para adicionar a entrada ao localStorage
function adicionarEntrada(casal, valor) {
    const entradas = JSON.parse(localStorage.getItem("entradas")) || [];

    // Cria o objeto da nova entrada
    const novaEntrada = {
        casal: casal,
        valor: parseFloat(valor).toFixed(2), // Converte o valor para número com duas casas decimais
        data: new Date().toLocaleDateString() // Adiciona a data atual no formato local
    };

    // Adiciona a nova entrada à lista
    entradas.push(novaEntrada);

    // Salva a lista atualizada no localStorage
    localStorage.setItem("entradas", JSON.stringify(entradas));

    // Mensagem de confirmação
    alert('Entrada adicionada com sucesso!');
}

// Função para gerar e mostrar o recibo impressão em uma nova janela
function gerarRecibo(casal, valor) {
    // Armazena o número do recibo atual e incrementa para a próxima entrada
    const numeroReciboAtual = numeroRecibo++;

    // Cria uma nova janela
    const novaJanela = window.open('', '_blank');

    // Escreve o conteúdo do recibo na nova janela
    novaJanela.document.write(`
        <html>
        <head>
            <title>Recibo de Pagamento</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { text-align: center; }
                p { font-size: 18px; }
                .recibo { 
                    width: 100%; 
                    padding: 10px; 
                    border: 1px solid #000; 
                    margin-bottom: 20px; 
                }
                img { 
                    max-width: 200px; /* Define um tamanho máximo para a imagem */
                    height: auto; 
                    display: block; 
                    margin: 0 auto 10px; /* Centraliza a imagem */
                }
            </style>
        </head>
        <body>
            <h2>Recibo de Pagamento</h2>
            <div class="recibo">
                <img src="imagens/imagem romantica.jpg" alt="Logo">
                <p><strong>Nome do Casal:</strong> ${casal}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Valor Pago:</strong> R$ ${valor}</p>
                <p>Agradecemos pela sua contribuição!</p>
                <p><strong>Número do Recibo:</strong> ${numeroReciboAtual}</p>
            </div>
             <h2>Recibo de Pagamento</h2>
            <div class="recibo">
                <img src="imagens/imagem romantica.jpg" alt="Logo">
                <p><strong>Nome do Casal:</strong> ${casal}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Valor Pago:</strong> R$ ${valor}</p>
                <p>Agradecemos pela sua contribuição!</p>
                <p><strong>Número do Recibo:</strong> ${numeroReciboAtual}</p>
            </div>
            <button id="printButton">Imprimir</button>
            <script>
                document.getElementById('printButton').onclick = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `);

    // Finaliza a escrita na nova janela
    novaJanela.document.close(); 
}

// Adiciona o evento ao botão de submissão
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitBtn');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        const selectedCouple = document.getElementById('filteredCoupleList').value;
        const amount = document.getElementById('amount').value;

        // Verifica se o casal e o valor estão preenchidos
        if (selectedCouple && amount) {
            // Desabilita o botão para prevenir cliques duplos
            this.disabled = true;

            // Adiciona a entrada e gera o recibo
            adicionarEntrada(selectedCouple, amount); // Chama a função de adicionar entrada
            gerarRecibo(selectedCouple, amount); // Gera e mostra o recibo

            // Fecha o modal de entrada
            document.getElementById('modal').style.display = 'none';

            // Habilita o botão novamente após 1 segundo
            setTimeout(() => {
                this.disabled = false; // Permite novas operações
            }, 1000);
        } else {
            alert('Por favor, selecione um casal e insira um valor.');
        }
    });
});
// Função para abrir o modal de exclusão de entrada
document.getElementById('openDeleteEntradaModalBtn').addEventListener('click', function() {
    document.getElementById('deleteEntradaModal').style.display = 'block'; // Exibe o modal de exclusão

    // Puxa e exibe as entradas no modal de exclusão
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const deleteEntradaTableBody = document.getElementById('deleteEntradaTableBody');
    deleteEntradaTableBody.innerHTML = '';

    // Popula a tabela de exclusão com as entradas
    entradas.forEach((entrada, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entrada.casal}</td>
            <td>R$ ${entrada.valor}</td>
            <td>${entrada.data}</td>
            <td><button onclick="excluirEntrada(${index})">Excluir</button></td>
        `;
        deleteEntradaTableBody.appendChild(row);
    });
});

// Função para filtrar casais no modal de exclusão
function filterDeleteCouples() {
    const filterValue = document.getElementById('deleteCoupleFilter').value.toLowerCase();
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const deleteEntradaTableBody = document.getElementById('deleteEntradaTableBody');
    deleteEntradaTableBody.innerHTML = '';

    entradas.forEach((entrada, index) => {
        if (entrada.casal.toLowerCase().includes(filterValue)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entrada.casal}</td>
                <td>R$ ${entrada.valor}</td>
                <td>${entrada.data}</td>
                <td><button onclick="excluirEntrada(${index})">Excluir</button></td>
            `;
            deleteEntradaTableBody.appendChild(row);
        }
    });
}

// Função para excluir uma entrada
function excluirEntrada(index) {
    let entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.splice(index, 1); // Remove a entrada pelo índice
    localStorage.setItem('entradas', JSON.stringify(entradas)); // Atualiza o localStorage

    // Atualiza a tabela de exclusão após remover a entrada
    filterDeleteCouples();
}
// Abre o modal de exclusão de despesas
document.getElementById('openDeleteDespesaModalBtn').addEventListener('click', function() {
    document.getElementById('deleteDespesaModal').style.display = 'block';
    loadDespesas(); // Carrega as despesas ao abrir o modal
});

// Fecha o modal de exclusão de despesas
document.getElementById('closeDeleteDespesaModalBtn').addEventListener('click', function() {
    document.getElementById('deleteDespesaModal').style.display = 'none';
});

// Função para filtrar despesas na tabela de exclusão
function filterDeleteDespesas() {
    const filter = document.getElementById('deleteDespesaFilter').value.toLowerCase();
    const tableBody = document.getElementById('deleteDespesaTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

// Função para carregar as despesas no modal de exclusão
function loadDespesas() {
    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    const tableBody = document.getElementById('deleteDespesaTableBody');
    tableBody.innerHTML = '';

    despesas.forEach((despesa, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${despesa.razaoSocial}</td>
            <td>${despesa.valor}</td>
            <td>${despesa.dataCompra}</td>
            <td><button onclick="deleteDespesa(${index})">Excluir</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para excluir uma despesa
function deleteDespesa(index) {
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    despesas.splice(index, 1); // Remove a despesa pelo índice
    localStorage.setItem('despesas', JSON.stringify(despesas)); // Atualiza o localStorage
    loadDespesas(); // Atualiza a tabela
}
// Bannes animados
let currentBanner = 0;
const banners = document.querySelectorAll('.banner');

function showNextBanner() {
    banners[currentBanner].classList.remove('active');
    banners[currentBanner].classList.add('exit'); // Adiciona a classe de saída

    currentBanner = (currentBanner + 1) % banners.length;

    banners[currentBanner].classList.remove('exit');
    banners[currentBanner].classList.add('active'); // Adiciona a classe de entrada
}

setInterval(showNextBanner, 3000); // Troca o banner a cada 3 segundos

// Inicialmente, mostre o primeiro banner
banners[currentBanner].classList.add('active');
document.getElementById("printCoupleListBtn").addEventListener("click", function() {
    const printContent = document.getElementById("couplesModal").innerHTML;
    const originalContent = document.body.innerHTML;

    // Substitui o conteúdo do body pelo conteúdo da lista a ser impressa
    document.body.innerHTML = printContent;

    // Comando de impressão
    window.print();

    // Restaura o conteúdo original da página
    document.body.innerHTML = originalContent;
});
// Pega o botão de fechar o modal
const closeModalBtn = document.getElementById("closeModal");

// Pega o modal que contém a lista de casais
const couplesModal = document.getElementById("couplesModal");

// Adiciona um evento de clique ao "X" para fechar o modal
closeModalBtn.addEventListener("click", function() {
    couplesModal.style.display = "none"; // Esconde o modal
});
// Função para gerar um número aleatório e garantir que ele não repita
function gerarNumeroRecibo() {
    let numeroAleatorio;
    const numerosUsados = JSON.parse(localStorage.getItem("numerosUsados")) || [];

    do {
        numeroAleatorio = Math.floor(Math.random() * 9000) + 1000; // Gera um número entre 1000 e 9999
    } while (numerosUsados.includes(numeroAleatorio)); // Verifica se o número já foi usado

    // Armazena o novo número
    numerosUsados.push(numeroAleatorio);
    localStorage.setItem("numerosUsados", JSON.stringify(numerosUsados));

    return numeroAleatorio;
}

// Variável global para controle do número de recibo, usando a função para gerar números únicos
let numeroRecibo = gerarNumeroRecibo(); // Gera um número de recibo único
document.getElementById("logoutButton").addEventListener("click", function() {
    // Remove o token de login
    localStorage.removeItem("loginToken");
    
    // Redireciona para a página de login
    window.location.href = 'login.html';
});
function autenticarUsuario() {
    const usuario = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const errorMessage = document.getElementById('errorMessage');

    if (usuario === "admin" && senha === "1234") {
        alert("Login bem-sucedido!");
        errorMessage.style.display = "none";
        localStorage.setItem("loginToken", "usuarioAutenticado"); // Armazena o token de login
        window.location.href = 'index.html'; // Redireciona para index.html após login bem-sucedido
    } else {
        errorMessage.style.display = "block";
    }
}
function verificarAutenticacao() {
    const token = localStorage.getItem("loginToken");
    if (!token) {
        // Se não houver token, redireciona para login.html
        window.location.href = 'login.html';
    }
}

// Chama a função de verificação ao carregar a página
window.onload = verificarAutenticacao;
// Verifica se o usuário está autenticado
if (!localStorage.getItem("loginToken")) {
    window.location.href = 'login.html'; // Redireciona para login.html se não estiver autenticado
}

window.addEventListener("beforeunload", function() {
    localStorage.removeItem("loginToken"); // Remove o token de login ao fechar a página
});

function logout() {
    localStorage.removeItem("loginToken"); // Remove o token de login
    window.location.href = 'login.html'; // Redireciona para login.html
}
document.getElementById("senha").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        autenticarUsuario(); // Chama a função de autenticação
    }
});