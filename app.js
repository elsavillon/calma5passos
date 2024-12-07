const etapas = {
  inicio: {
    imagem: "inicio-crise-convulsiva.gif",
    situacao: "Início da crise convulsiva.",
    audio: ["take_1.m4a", "take_2.m4a", "take_3.m4a", "take_4.m4a"], // Áudios em formato m4a
    acoes: [
      { texto: "Prestar os primeiros socorros", direciona: "pessoaCai", audio: "take_1.m4a" },
      { texto: "Ligar para o SAMU (192)", direciona: "pessoaCai", audio: "take_1.m4a" },
    ],
  },
  pessoaCai: {
    imagem: "pessoa-cai-chao.gif",
    situacao: "A pessoa bate a cabeça.",
    audio: "pessoa-cai.m4a", // Áudio em formato m4a
    acoes: [
      { texto: "Seguir instruções do SAMU", direciona: "pessoaDebate", audio: "pessoa-cai.m4a" },
    ],
  },
  pessoaDebate: {
    imagem: "pessoa-debate.gif",
    situacao: "A pessoa começa a se debater.",
    audio: "pessoa-debate.m4a", // Áudio em formato m4a
    acoes: [
      { texto: "C - Coloque a pessoa de lado, com a cabeça elevada para evitar sufocamento com saliva.", direciona: "pessoaContinua", audio: "pessoa-debate.m4a" },
    ],
  },
  pessoaContinua: {
    imagem: "pessoa-continua-debatendo.gif",
    situacao: "A pessoa continua se debatendo.",
    audio: "pessoa-continua.m4a", // Áudio em formato m4a
    acoes: [
      { texto: "A - Apoie a cabeça da pessoa com algo macio (blusa, mochila, jaleco).", direciona: "pessoaSaliva", audio: "pessoa-continua.m4a" },
    ],
  },
  pessoaSaliva: {
    imagem: "pessoa-saliva.gif",
    situacao: "A pessoa saliva e há riscos associados.",
    audio: "pessoa-saliva.m4a", // Áudio em formato m4a
    acoes: [
      { texto: "L - Localize e afaste objetos perigosos (retire óculos, afrouxe roupas apertadas).", direciona: "monitorarTempo", audio: "pessoa-saliva.m4a" },
    ],
  },
  monitorarTempo: {
    imagem: "monitorar-tempo.gif",
    situacao: "Monitorando o tempo da crise.",
    audio: "monitorar-tempo.m4a", // Áudio em formato m4a
    acoes: [
      { texto: "M - Monitore a duração da crise e ligue para o SAMU se durar mais de 5 minutos.", direciona: "fimCrise", audio: "monitorar-tempo.m4a" },
    ],
  },
  fimCrise: {
    imagem: "fim-crise.gif",
    situacao: "Convulsão termina e a pessoa recupera a consciência.",
    audio: "fim-crise.m4a", // Áudio em formato m4a
    acoes: [
      { texto: "A - Acompanhe a pessoa até que ela esteja em segurança. Ligue para o SAMU se necessário.", direciona: "inicio", audio: "fim-crise.m4a" },
    ],
  },
};

let audioPlayer = null; // Variável global para o player de áudio

function mostrar(nome) {
  const etapa = etapas[nome];
  let botoes = "";

  // Gerar botões com base nas ações da etapa atual
  for (let acao of etapa.acoes) {
    botoes += `<button onclick="mostrar('${acao.direciona}'); playAudio('${acao.audio}')">${acao.texto}</button>`;
  }

  // Atualizar o conteúdo da div "narrativa"
  document.getElementById("narrativa").innerHTML = `
    <img src="${etapa.imagem}" alt="" />
    <p>${etapa.situacao}</p>
    <div>${botoes}</div>
  `;

  // Reproduzir o áudio da etapa (se for uma lista de áudios, escolhemos um aleatoriamente)
  if (audioPlayer) {
    audioPlayer.pause(); // Pausa o áudio anterior
    audioPlayer.currentTime = 0; // Reseta o tempo do áudio anterior
  }

  // Se a etapa tem múltiplos áudios, escolhemos um aleatoriamente
  let audioSrc = Array.isArray(etapa.audio) ? etapa.audio[Math.floor(Math.random() * etapa.audio.length)] : etapa.audio;

  // Criar ou atualizar o áudio da etapa
  audioPlayer = new Audio(audioSrc);
  audioPlayer.play().catch((error) => {
    console.error("Erro ao reproduzir áudio:", error);
  });
}

// Função para tocar o áudio das ações
function playAudio(audioSrc) {
  const audioAction = new Audio(audioSrc);
  audioAction.play().catch((error) => {
    console.error("Erro ao reproduzir áudio da ação:", error);
  });
}

// Exibir a etapa inicial ao carregar a página
mostrar("inicio");
