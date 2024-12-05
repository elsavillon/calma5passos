const etapas = {
  inicio: {
    imagem: "inicio-crise-convulsiva.gif",
    situacao: "Início da crise convulsiva.",
    acoes: [
      { texto: "Prestar os primeiros socorros", direciona: "pessoaCai" },
      { texto: "Ligar para o SAMU (192)", direciona: "pessoaCai" },
    ],
  },
  pessoaCai: {
    imagem: "pessoa-cai-chao.gif",
    situacao: "A pessoa bate a cabeça.",
    acoes: [
      { texto: "Seguir instruções do SAMU", direciona: "pessoaDebate" },
    ],
  },
  pessoaDebate: {
    imagem: "pessoa-debate.gif",
    situacao: "A pessoa começa a se debater.",
    acoes: [
      { texto: "C - Coloque a pessoa de lado, com a cabeça elevada para evitar sufocamento com saliva.", direciona: "pessoaContinua" },
    ],
  },
  pessoaContinua: {
    imagem: "pessoa-continua-debatendo.gif",
    situacao: "A pessoa continua se debatendo.",
    acoes: [
      { texto: "A - Apoie a cabeça da pessoa com algo macio (blusa, mochila, jaleco).", direciona: "pessoaSaliva" },
    ],
  },
  pessoaSaliva: {
    imagem: "pessoa-saliva.gif",
    situacao: "A pessoa saliva e há riscos associados.",
    acoes: [
      { texto: "L - Localize e afaste objetos perigosos (retire óculos, afrouxe roupas apertadas).", direciona: "monitorarTempo" },
    ],
  },
  monitorarTempo: {
    imagem: "monitorar-tempo.gif",
    situacao: "Monitorando o tempo da crise.",
    acoes: [
      { texto: "M - Monitore a duração da crise e ligue para o SAMU se durar mais de 5 minutos.", direciona: "fimCrise" },
    ],
  },
  fimCrise: {
    imagem: "fim-crise.gif",
    situacao: "Convulsão termina e a pessoa recupera a consciência.",
    acoes: [
      { texto: "A - Acompanhe a pessoa até que ela esteja em segurança. Ligue para o SAMU se necessário.", direciona: "inicio" },
    ],
  },
};

function mostrar(nome) {
  const etapa = etapas[nome];
  let botoes = "";

  // Gerar botões com ações
  for (let acao of etapa.acoes) {
    botoes += `<button onclick="mostrar('${acao.direciona}')">${acao.texto}</button>`;
  }

  // Atualizar o conteúdo do quadro interativo
  document.getElementById("narrativa").innerHTML = `
    <img src="${etapa.imagem}" alt="" />
    <p>${etapa.situacao}</p>
    <div>${botoes}</div>
  `;
}

// Inicializar com a primeira etapa
mostrar("inicio");
