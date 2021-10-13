let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.divisao2');
let lateral = document.querySelector('.divisao1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
  // funcao vai limpar a tela, pegar as iformaçoes da etapa atual, e vai preencher
  // o que precisa ser prenchido

  let etapa = etapas[etapaAtual];

  let numeroHtml = '';
  numero = '';

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    let fotosHtml = '';
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-image small"><img src="imagens/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d-1-image"><img src="imagens/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
  }
}

function clicou(num) {
  let elNumero = document.querySelector('.numero.pisca');

  let music2 = new Audio('somUrna/somTecla.mp3');
  music2.play();
  if (elNumero !== null) {
    elNumero.innerHTML = num;
    numero = `${numero}${num}`;

    elNumero.classList.remove('pisca');
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('pisca');
    } else {
      atualizaInterface();
    }
  }
}

function branco() {
  numero = '';
  votoBranco = true;

  seuVotoPara.style.display = 'block';
  aviso.style.display = 'block';
  numeros.innerHTML = '';
  descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
  lateral.innerHTML = '';
}

function corrige() {
  console.log('clicou em corrige');
  comecarEtapa();
}

// depois salvar os votos em json ou e banco de dados
function confirma() {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  let music = new Audio('somUrna/somConfirma.mp3');

  if (votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco',
    });

    music.play();
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero,
    });
    music.play();
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML =
        '<div class="aviso-gigante pisca">FIM</div>';
      console.log(votos);
    }
  }
}

comecarEtapa();

// https://github.com/kayanbrandao/urna-eletronica/blob/main/script.js
// link do giithub com o projeto
