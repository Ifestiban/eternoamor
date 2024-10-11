// Variáveis globais
let casais = [];
let despesas = [];
let entradas = [];

// Função para mostrar o formulário de inscrição
function mostrarFormulario() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    document.getElementById("formulario").style.display = "block";
}

// Função para adicionar um casal
function adicionarCasal() {
    const nomeEle = document.getElementById('nomeEle').value;
    const nomeEla = document.getElementById('nomeEla').value;
    const observacoes = document.getElementById('observacoes').value;

    // Salvando no Firestore
    db.collection("casais").add({
        nomeEle: nomeEle,
        nomeEla: nomeEla,
        observacoes: observacoes,
        entradas: 0, // Você pode inicializar com zero ou deixar vazio
        saídas: 0 // Mesma lógica para saídas
    })
    .then(() => {
        alert("Casal salvo com sucesso!");
        // Exibe mensagem de sucesso e limpa o formulário
        document.getElementById('casalForm').reset();
        document.getElementById('mensagemSucessoCasal').textContent = "Casal cadastrado com sucesso!";
    })
    .catch((error) => {
        console.error("Erro ao adicionar casal: ", error);
    });
}


// Função para adicionar uma despesa
function adicionarDespesa() {
    const tipoDespesa = document.getElementById("tipoDespesa").value;
    const valorDespesa = parseFloat(document.getElementById("valorDespesa").value);

    if (!tipoDespesa || !valorDespesa) {
        alert("Por favor, preencha os campos.");
        return;
    }

    // Salvando no Firestore
    db.collection("despesas").add({
        tipo: tipoDespesa,
        valor: valorDespesa,
        data: new Date().toLocaleDateString()
    })
    .then(() => {
        alert("Despesa adicionada com sucesso");
        fecharModalDespesas();
    })
    .catch((error) => {
        console.error("Erro ao adicionar despesa: ", error);
    });
}

// Funções para abrir e fechar modais
function abrirModalDespesas() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    document.getElementById("modalDespesas").style.display = 'block';
}

function fecharModalDespesas() {
    document.getElementById("modalDespesas").style.display = 'none';
}

function abrirModalEntradas() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    document.getElementById("modalEntradas").style.display = 'block';
}

function fecharModalEntradas() {
    document.getElementById("modalEntradas").style.display = 'none';
}

function fecharComprovanteModal() {
    document.getElementById("comprovanteModal").style.display = 'none';
}

// Função para carregar os casais na inicialização
window.onload = function() {
    carregarCasais();
    verificarLogin(); // Verificar login na inicialização
};

// Função para gerar o relatório
function gerarRelatorio() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];

    let totalEntradas = 0;
    let totalDespesas = 0;

    // Calcular total de entradas
    entradas.forEach(entrada => {
        totalEntradas += entrada.valor;
    });

    // Calcular total de despesas
    despesas.forEach(despesa => {
        totalDespesas += despesa.valor;
    });

    const saldoFinal = totalEntradas - totalDespesas;

    // Gerar HTML para exibir o relatório
    const relatorioHTML = `
        <h2>Relatório Financeiro</h2>
        <p>Total de Entradas: R$ ${totalEntradas.toFixed(2)}</p>
        <p>Total de Despesas: R$ ${totalDespesas.toFixed(2)}</p>
        <p>Saldo Final: R$ ${saldoFinal.toFixed(2)}</p>
    `;

    // Exibir o relatório em um container ou modal
    document.getElementById('relatorioContainer').innerHTML = relatorioHTML;
}

// Evento para exibir o modal de pagamento PIX
document.getElementById("pagueAgoraBtn").addEventListener("click", function () {
    document.getElementById("dataPagamento").textContent = new Date().toLocaleDateString();
    document.getElementById("comprovanteModal").style.display = 'block';
});

// Eventos para salvar entradas e gerar o relatório
document.getElementById("salvarEntradaBtn").addEventListener("click", adicionarEntrada);
document.getElementById("gerarRelatorioBtn").addEventListener("click", gerarRelatorio);

// Função para logout
function logout() {
    localStorage.removeItem('loginToken'); // Remove o token de login
    window.location.href = 'login.html'; // Redireciona para a página de login
}

// Verificação de login: Redireciona para a página de login se não estiver autenticado
function verificarLogin() {
    const loginToken = localStorage.getItem("loginToken");
    if (!loginToken) {
        window.location.href = "login.html"; // Redireciona para a página de login se não houver token de login
    }
}


// Função para fechar todos os menus
function closeAllMenus() {
    const allMenus = document.querySelectorAll('.menu-content');
    allMenus.forEach(menu => menu.style.display = 'none');
}

// Função para abrir o modal e fechar o menu
function abrirModalNotaFiscal() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    document.getElementById("modalNotaFiscal").style.display = "block";
}

// Função para abrir uma nova janela e fechar o menu
function abrirNovaJanela(url, title, width, height) {
    closeAllMenus(); // Fecha o menu antes de abrir a nova janela
    window.open(url, title, `width=${width},height=${height}`);
}

// Exemplo de função que abre um modal de despesas e fecha o menu
function abrirModalDespesas() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    document.getElementById("modalDespesas").style.display = 'block';
}

// Função para abrir o modal da Nota Fiscal
function abrirModalNotaFiscal() {
    document.getElementById("modalNotaFiscal").style.display = "block";
}

// Função para fechar o modal da Nota Fiscal
function fecharModalNotaFiscal() {
    document.getElementById("modalNotaFiscal").style.display = "none";
}

// Função para adicionar despesa com nota fiscal
function adicionarDespesaNota() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    const razaoSocial = document.getElementById("razaoSocial").value;
    const cnpj = document.getElementById("cnpj").value;
    const numeroDocumento = document.getElementById("numeroDocumento").value;
    const valorDespesaNota = parseFloat(document.getElementById("valorDespesaNota").value);
    const descricaoDespesa = document.getElementById("descricaoDespesa").value;

    if (!razaoSocial || !cnpj || !numeroDocumento || !valorDespesaNota || !descricaoDespesa) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const despesaNotaFiscal = {
        razaoSocial: razaoSocial,
        cnpj: cnpj,
        numeroDocumento: numeroDocumento,
        valor: valorDespesaNota,
        descricao: descricaoDespesa
    };

    despesas.push(despesaNotaFiscal);
    salvarLocal('despesas', despesas);
    alert("Nota Fiscal adicionada com sucesso!");
    fecharModalNotaFiscal();
    consultarDespesas(); // Atualiza a listagem de despesas
}

// Função para abrir o modal de adicionar despesa comum ou nota fiscal
function abrirModalDespesas() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    const adicionarNotaFiscal = confirm("Deseja adicionar uma despesa com Nota Fiscal?");
    if (adicionarNotaFiscal) {
        abrirModalNotaFiscal();
    } else {
        document.getElementById("modalDespesas").style.display = 'block';
    }
}
// Função para consultar despesas
function consultarDespesas() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    const tabelaDespesas = document.querySelector('#tabelaDespesas tbody');
    tabelaDespesas.innerHTML = ''; // Limpa a tabela antes de preenchê-la

    despesas.forEach((despesa, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${despesa.tipo}</td>
            <td>R$ ${despesa.valor}</td>
            <td><button onclick="excluirDespesa(${index})">Excluir</button></td>
        `;
        tabelaDespesas.appendChild(novaLinha);
    });

    document.getElementById('modalDespesasConsulta').style.display = 'block'; // Mostra o modal
}

// Função para consultar entradas
function consultarEntradas() {
    closeAllMenus(); // Fecha o menu ao abrir o modal
    const tabelaEntradas = document.querySelector('#tabelaEntradas tbody');
    tabelaEntradas.innerHTML = ''; // Limpa a tabela antes de preenchê-la

    entradas.forEach((entrada, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${entrada.casal}</td>
            <td>R$ ${entrada.valor}</td>
            <td><button onclick="excluirEntrada(${index})">Excluir</button></td>
        `;
        tabelaEntradas.appendChild(novaLinha);
    });

    document.getElementById('modalEntradasConsulta').style.display = 'block'; // Mostra o modal
}

// Função para excluir despesa
function excluirDespesa(index) {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        despesas.splice(index, 1); // Remove a despesa do array
        consultarDespesas(); // Atualiza a listagem
    }
}

// Função para excluir entrada
function excluirEntrada(index) {
    if (confirm('Tem certeza que deseja excluir esta entrada?')) {
        entradas.splice(index, 1); // Remove a entrada do array
        consultarEntradas(); // Atualiza a listagem
    }
}

// Função para fechar o modal de consulta
function fecharModalConsulta(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
// Função para adicionar uma entrada
function adicionarEntrada() {
    const casalNome = document.getElementById("casalEntrada").value;
    const valorEntrada = parseFloat(document.getElementById("valorEntrada").value);
    const data = new Date().toLocaleDateString(); // Data do pagamento

    if (!casalNome || !valorEntrada) {
        alert("Por favor, preencha os campos.");
        return;
    }

     const numeroControle = Math.floor(Math.random() * 1000000); // Gera o número de controle

    // Salvando no Firestore
    db.collection("entradas").add({
        casal: casalNome,
        valor: valorEntrada,
        data: data,
        controle: numeroControle
    })
    .then(() => {
        alert("Entrada adicionada com sucesso");
        // Atualiza o formulário
        document.getElementById('entradaForm').reset();
    })
    .catch((error) => {
        console.error("Erro ao adicionar entrada: ", error);
    });


    // Abre uma nova janela para exibir a listagem de entradas e o comprovante
    const novaJanela = window.open("", "_blank", "width=800,height=600");

    // Conteúdo da nova janela com as 2 vias uma abaixo da outra em uma única página
    novaJanela.document.write(`
        <html>
        <head>
            <title>Comprovante de Pagamento - Duas Vias</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; }
                .container { width: 100%; max-width: 210mm; height: 297mm; margin: auto; }
                .comprovante { border: 1px solid #000; padding: 10px; margin-bottom: 20px; box-sizing: border-box; }
                .logo { width: 100px; margin-bottom: 10px; }
                .detalhes { text-align: left; font-size: 12px; }
                .detalhes p { margin: 5px 0; }
                .assinatura { margin-top: 15px; text-align: left; }
                .assinatura hr { width: 80%; margin: 10px auto; }
                .via-separator { border-top: 2px dashed #000; margin: 20px 0; }
                button { padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer; margin-top: 20px; }
                @media print {
                    button { display: none; } /* Oculta o botão ao imprimir */
                    .container { height: auto; } /* Ajusta a altura ao conteúdo ao imprimir */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Via 1 -->
                <div class="comprovante">
                    <img src="logo.png" alt="Logotipo da Empresa" class="logo">
                    <h2>Pagamento Realizado com Sucesso</h2>
                    <div class="detalhes">
                        <p><strong>Data:</strong> ${data}</p>
                        <p><strong>Nome do Casal:</strong> ${casalNome}</p>
                        <p><strong>Valor Pago:</strong> R$ ${valorEntrada}</p>
                        <p><strong>Número de Controle:</strong> ${numeroControle}</p>
                    </div>
                    <div class="assinatura">
                        <p>Assinatura do Casal:</p>
                        <hr>
                    </div>
                </div>

                <div class="via-separator"></div> <!-- Separador entre as vias -->

                <!-- Via 2 -->
                <div class="comprovante">
                    <img src="logo.png" alt="Logotipo da Empresa" class="logo">
                    <h2>Pagamento Realizado com Sucesso</h2>
                    <div class="detalhes">
                        <p><strong>Data:</strong> ${data}</p>
                        <p><strong>Nome do Casal:</strong> ${casalNome}</p>
                        <p><strong>Valor Pago:</strong> R$ ${valorEntrada}</p>
                        <p><strong>Número de Controle:</strong> ${numeroControle}</p> <!-- Mesmo número para as duas vias -->
                    </div>
                    <div class="assinatura">
                        <p>Assinatura do Casal:</p>
                        <hr>
                    </div>
                </div>
            </div>

            <button onclick="window.print()">Imprimir Comprovante</button>
        </body>
        </html>
    `);

    novaJanela.document.close();
    novaJanela.focus(); // Focar na nova janela para impressão
}
// Função para abrir o modal de consulta de notas fiscais
function consultarNotasFiscais() {
    const notas = JSON.parse(localStorage.getItem('despesas')) || [];
    const tabelaNotas = document.getElementById('tabelaNotasFiscais');
    tabelaNotas.innerHTML = ''; // Limpa a tabela antes de preenchê-la

    notas.forEach((nota) => {
        if (nota.cnpj) { // Verifica se a despesa é uma nota fiscal
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>${nota.razaoSocial}</td>
                <td>${nota.cnpj}</td>
                <td>${nota.numeroDocumento}</td>
                <td>R$ ${nota.valor}</td>
                <td>${nota.descricao}</td>
            `;
            tabelaNotas.appendChild(novaLinha);
        }
    });

    document.getElementById('modalNotasFiscais').style.display = 'block'; // Abre o modal
}

// Função para fechar o modal de consulta de notas fiscais
function fecharModalNotasFiscais() {
    document.getElementById('modalNotasFiscais').style.display = 'none';
}
// Função para alternar o menu
function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    
    // Fecha todos os menus antes de abrir o atual
    closeAllMenus();

    // Alterna a visibilidade do menu atual
    menuContent.style.display = (menuContent.style.display === 'block') ? 'none' : 'block';
}

// Função para fechar todos os menus
function closeAllMenus() {
    const allMenus = document.querySelectorAll('.menu-content');
    allMenus.forEach(menu => menu.style.display = 'none');
}

// Fechar o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.menu-container');
    const menuContent = document.getElementById('menuContent');
    const toggleButton = document.querySelector('.menu-btn'); // Botão que abre o menu

    // Verifica se o clique foi fora do menu e do botão de alternância
    if (!menuContainer.contains(event.target) && !toggleButton.contains(event.target)) {
        menuContent.style.display = 'none';
    }
});

// Salvar no firebase
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCEuTgRYIZeEDYXBRlLI8salnEeiC4cVN0",
    authDomain: "eterno-amor-7b2bf.firebaseapp.com",
    projectId: "eterno-amor-7b2bf",
    storageBucket: "eterno-amor-7b2bf.appspot.com",
    messagingSenderId: "541277875236",
    appId: "1:541277875236:web:7cd9ff37fc9e5f7a5bbcb1",
    measurementId: "G-M1Q655JCC1"
  };

  // Inicialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Function to handle form submission and send data to Firestore
  const form = document.getElementById('dataForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
      // Add the form data to Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        name: name,
        email: email,
        message: message,
        timestamp: new Date()
      });
      console.log("Documento gravado com ID: ", docRef.id);
      alert("Dados enviados com sucesso!");
      
      // Limpar o formulário após o envio
      form.reset();
    } catch (error) {
      console.error("Erro ao adicionar o documento: ", error);
      alert("Erro ao enviar os dados.");
    }
  });
  function carregarCasais() {
    db.collection("casais").get().then((querySnapshot) => {
        const tabela = document.getElementById('tabelaCasais').getElementsByTagName('tbody')[0];
        tabela.innerHTML = ''; // Limpa a tabela antes de carregar os dados

        querySnapshot.forEach((doc) => {
            const casal = doc.data();
            const newRow = tabela.insertRow();
            newRow.insertCell(0).textContent = casal.nomeEle;
            newRow.insertCell(1).textContent = casal.nomeEla;
            newRow.insertCell(2).textContent = casal.entradas || 0;
            newRow.insertCell(3).textContent = casal.saídas || 0;
        });
    });
}