// Variáveis globais
let casais = [];
let despesas = [];
let entradas = [];

// Função para mostrar o formulário de inscrição
function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
}

// Função para adicionar um casal
function adicionarCasal() {
    const nomeEle = document.getElementById("nomeEle").value;
    const nomeEla = document.getElementById("nomeEla").value;

    const casal = {
        nomeEle: nomeEle,
        nomeEla: nomeEla,
        entradas: 0,
        saidas: 0
        
    };

    casais.push(casal);
    atualizarTabelaCasais();

    // Exibe a mensagem de sucesso
    alert("Casal adicionado com sucesso!");

    // Reseta o formulário
    document.getElementById("casalForm").reset();

    // Fechar o formulário após adicionar o casal
    document.getElementById("formulario").style.display = "none";
}

// Função para atualizar a tabela de casais
function atualizarTabelaCasais() {
    const tabela = document.getElementById("tabelaCasais").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    casais.forEach(casal => {
        const row = tabela.insertRow();
        const cellNomeEle = row.insertCell(0);
        const cellNomeEla = row.insertCell(1);
        const cellEntradas = row.insertCell(2);
        const cellSaidas = row.insertCell(3);

        cellNomeEle.textContent = casal.nomeEle;
        cellNomeEla.textContent = casal.nomeEla;
        cellEntradas.textContent = casal.entradas;
        cellSaidas.textContent = casal.saidas;
    });
}

// Função para abrir o modal de despesas
function abrirModalDespesas() {
    document.getElementById('modalDespesas').style.display = 'block';
}

// Função para fechar o modal de despesas
function fecharModalDespesas() {
    document.getElementById("modalDespesas").style.display = "none";
}

// Função para adicionar uma despesa
function adicionarDespesa() {
    const tipoDespesa = document.getElementById("tipoDespesa").value;
    const valorDespesa = parseFloat(document.getElementById("valorDespesa").value);

    const despesa = {
        tipo: tipoDespesa,
        valor: valorDespesa
    };

    despesas.push(despesa);
    atualizarTabelaDespesas();
    fecharModalDespesas();
}

// Função para atualizar a tabela de despesas
function atualizarTabelaDespesas() {
    const tabela = document.getElementById("tabelaDespesas").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    despesas.forEach(despesa => {
        const row = tabela.insertRow();
        const cellTipo = row.insertCell(0);
        const cellValor = row.insertCell(1);

        cellTipo.textContent = despesa.tipo;
        cellValor.textContent = despesa.valor;
    });
}

// Função para abrir o modal de entradas
function abrirModalEntradas() {
    const selectCasal = document.getElementById("casalEntrada");
    selectCasal.innerHTML = "";
    casais.forEach(casal => {
        const option = document.createElement("option");
        option.value = casal.nomeEle + " & " + casal.nomeEla;
        option.textContent = casal.nomeEle + " & " + casal.nomeEla;
        selectCasal.appendChild(option);
    });

    document.getElementById("modalEntradas").style.display = "block";
}

// Função para fechar o modal de entradas
function fecharModalEntradas() {
    document.getElementById("modalEntradas").style.display = "none";
}

// Função para adicionar uma entrada
function adicionarEntrada() {
    const casalSelecionado = document.getElementById("casalEntrada").value;
    const valorEntrada = parseFloat(document.getElementById("valorEntrada").value);

    const entrada = {
        casal: casalSelecionado,
        valor: valorEntrada
    };

    entradas.push(entrada);
    atualizarTabelaEntradas();
    fecharModalEntradas();
}

// Função para atualizar a tabela de entradas
function atualizarTabelaEntradas() {
    const tabela = document.getElementById("tabelaEntradas").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    entradas.forEach(entrada => {
        const row = tabela.insertRow();
        const cellCasal = row.insertCell(0);
        const cellValor = row.insertCell(1);

        cellCasal.textContent = entrada.casal;
        cellValor.textContent = entrada.valor;
    });
}

// Função para gerar o relatório
function gerarRelatorio() {
    const relatorio = {
        entradas: entradas,
        despesas: despesas
    };

    const novaJanela = window.open("", "_blank");
    novaJanela.document.write("<html><head><title>Relatório</title></head><body>");
    novaJanela.document.write("<h1>Relatório de Entradas e Saídas</h1>");

    novaJanela.document.write("<h3>Entradas:</h3>");
    novaJanela.document.write("<table border='1'><tr><th>Casal</th><th>Valor (R$)</th></tr>");
    relatorio.entradas.forEach(entrada => {
        novaJanela.document.write(`<tr><td>${entrada.casal}</td><td>${entrada.valor}</td></tr>`);
    });
    novaJanela.document.write("</table>");

    novaJanela.document.write("<h3>Despesas:</h3>");
    novaJanela.document.write("<table border='1'><tr><th>Tipo</th><th>Valor (R$)</th></tr>");
    relatorio.despesas.forEach(despesa => {
        novaJanela.document.write(`<tr><td>${despesa.tipo}</td><td>${despesa.valor}</td></tr>`);
    });
    novaJanela.document.write("</table>");

    novaJanela.document.write("</body></html>");
    novaJanela.document.close();
    novaJanela.print();
    // Relatório pode ser gerado conforme necessário
    alert("Relatório gerado com sucesso!");
}

document.getElementById("pagueAgoraBtn").addEventListener("click", function () {
    const dataAtual = new Date().toLocaleDateString();
    document.getElementById("dataPagamento").textContent = dataAtual;

    // Exibir o modal do comprovante
    document.getElementById("comprovanteModal").style.display = "block";
});

function fecharComprovanteModal() {
    document.getElementById("comprovanteModal").style.display = "none";
}

function imprimirComprovante() {
    const conteudo = document.getElementById("comprovanteModal").innerHTML;
    const janela = window.open('', '', 'height=600,width=800');
    janela.document.write('<html><head><title>Comprovante de Pagamento</title></head><body>');
    janela.document.write(conteudo);
    janela.document.write('</body></html>');
    janela.document.close();
    janela.print();
}
// Funções para abrir e fechar os modais
document.getElementById("consultarEntradasBtn").addEventListener("click", function () {
    document.getElementById("entradasModal").style.display = "block";
});

document.getElementById("consultarDespesasBtn").addEventListener("click", function () {
    document.getElementById("despesasModal").style.display = "block";
});

function fecharEntradasModal() {
    document.getElementById("entradasModal").style.display = "none";
}

function fecharDespesasModal() {
    document.getElementById("despesasModal").style.display = "none";
}

// Funções para consulta
function consultarEntradas() {
    const casal = document.getElementById("casalEntradas").value;
    const tipo = document.getElementById("tipoEntrada").value;
    
    // Simulação de consulta e resultado
    const resultado = `Resultados para ${casal} - Tipo de Entrada: ${tipo}`;
    document.getElementById("resultadoEntradas").textContent = resultado;
}

function consultarDespesas() {
    const casal = document.getElementById("casalDespesas").value;
    const tipo = document.getElementById("tipoDespesa").value;
    
    // Simulação de consulta e resultado
    const resultado = `Resultados para ${casal} - Tipo de Despesa: ${tipo}`;
    document.getElementById("resultadoDespesas").textContent = resultado;
}
// Função para salvar o casal no localStorage
function adicionarCasal() {
    const nomeEle = document.getElementById('nomeEle').value;
    const nomeEla = document.getElementById('nomeEla').value;

    // Verifica se já existem casais salvos
    const casaisSalvos = JSON.parse(localStorage.getItem('casais')) || [];

    // Adiciona o novo casal
    casaisSalvos.push({ nomeEle, nomeEla });

    // Salva novamente no localStorage
    localStorage.setItem('casais', JSON.stringify(casaisSalvos));

    // Exibe mensagem de sucesso
    document.getElementById('mensagemSucessoCasal').innerText = 'Casal adicionado com sucesso';
    
    // Reseta o formulário
    document.getElementById('casalForm').reset();

    // Fecha o formulário
    document.getElementById('formulario').style.display = 'none';

    // Atualiza a lista de casais nos selects
    carregarCasais();
}

// Função para carregar os casais salvos no localStorage
function carregarCasais() {
    const casaisSalvos = JSON.parse(localStorage.getItem('casais')) || [];
    const casalEntrada = document.getElementById('casalEntrada');
    const casalEntradas = document.getElementById('casalEntradas');
    const casalDespesas = document.getElementById('casalDespesas');

    // Limpa os selects
    casalEntrada.innerHTML = '';
    casalEntradas.innerHTML = '';
    casalDespesas.innerHTML = '';

    // Popula os selects com os casais salvos
    casaisSalvos.forEach(casal => {
        const option = document.createElement('option');
        option.value = casal.nomeEle + ' e ' + casal.nomeEla;
        option.innerText = casal.nomeEle + ' e ' + casal.nomeEla;
        casalEntrada.appendChild(option);
        casalEntradas.appendChild(option.cloneNode(true));
        casalDespesas.appendChild(option.cloneNode(true));
    });
}

// Função para salvar as despesas no localStorage
function adicionarDespesa() {
    const tipoDespesa = document.getElementById('tipoDespesa').value;
    const valorDespesa = document.getElementById('valorDespesa').value;

    // Verifica se já existem despesas salvas
    const despesasSalvas = JSON.parse(localStorage.getItem('despesas')) || [];

    // Adiciona a nova despesa
    despesasSalvas.push({ tipoDespesa, valorDespesa });

    // Salva novamente no localStorage
    localStorage.setItem('despesas', JSON.stringify(despesasSalvas));

    // Exibe mensagem de sucesso
    alert('Despesa adicionada com sucesso');

    // Fecha o modal
    fecharModalDespesas();
}

// Função para salvar as entradas no localStorage
function adicionarEntrada() {
    const casalEntrada = document.getElementById('casalEntrada').value;
    const valorEntrada = document.getElementById('valorEntrada').value;

    // Verifica se já existem entradas salvas
    const entradasSalvas = JSON.parse(localStorage.getItem('entradas')) || [];

    // Adiciona a nova entrada
    entradasSalvas.push({ casalEntrada, valorEntrada });

    // Salva novamente no localStorage
    localStorage.setItem('entradas', JSON.stringify(entradasSalvas));

    // Exibe mensagem de sucesso
    alert('Entrada adicionada com sucesso');

    // Fecha o modal
    fecharModalEntradas();
}

// Chama a função para carregar os casais ao carregar a página
window.onload = function() {
    carregarCasais();
}