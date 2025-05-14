const nave = document.getElementById('nave');
const missilEsquerda = document.querySelector('.missil.esquerda');
const missilDireita = document.querySelector('.missil.direita');

const velocidade = 0.75;

let modificarNave = 0;
let posicaoNave = 50;
let jogoPausado = false;
let impausavel = false;
let fim = false;
let intervalosAliens = [];
let fase = 1;
let vitoria = false;

let segundos = 0;
let intervalo = null;

function formatarTempo(seg) {
  const h = String(Math.floor(seg / 3600)).padStart(2, '0');
  const m = String(Math.floor((seg % 3600) / 60)).padStart(2, '0');
  const s = String(seg % 60).padStart(2, '0');
  return `${h}:${m}:${s}`
}

function atualizarDisplay() {
  document.getElementById("cronometro").textContent = formatarTempo(segundos);
}

function iniciarCronometro() {
  if (intervalo !== null) return;
  intervalo = setInterval(() => {
    segundos++;
    atualizarDisplay();
  }, 1000);
}

window.onload = iniciarCronometro;

const limiteEsquerda = 25;
const limiteDireita = 75;

let missilEsqAtivo = false;
let missilDirAtivo = false;


function moverNave(e) {
  if (jogoPausado) return;
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    if (posicaoNave > limiteEsquerda) {
      modificarNave -= velocidade;
      posicaoNave -= velocidade;
    }
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    if (posicaoNave < limiteDireita) {
      modificarNave += velocidade;
      posicaoNave += velocidade;
    }
  }

  nave.style.left = `${modificarNave}vw`;

  if (!missilEsqAtivo) {
    missilEsquerda.style.left = `${modificarNave + 0.5}vw`;
  }
  if (!missilDirAtivo) {
    missilDireita.style.left = `${modificarNave + 5.1}vw`;
  }

}

function ligarDesligarCronometro() {
  if (intervalo !== null) {
    clearInterval(intervalo);
    intervalo = null;
  } else {
    iniciarCronometro();
  }
}

document.addEventListener('keydown', moverNave);



let estadoDisparo = 0;
let alturaDeRepouso = 6;
const alturaMaxima = 87;


const dispararMissil = (missil, alturaInicial, aoFinalizar) => {
  let altura = alturaInicial;
  const intervalo = setInterval(() => {
    if (jogoPausado) { return };

    if (altura >= alturaMaxima) {
      clearInterval(intervalo);
      missil.style.bottom = `${alturaMaxima}vh`;
      if (typeof aoFinalizar === "function") {
        aoFinalizar();
      }
    } else {
      altura += 1;
      missil.style.bottom = `${altura}vh`
    }
  }, 10);
  intervalosAliens.push(intervalo);
}

function reiniciarMisseis(){
  missilEsqAtivo = false;
  missilDirAtivo = false;

  missilEsquerda.style.bottom = `${alturaDeRepouso}vh`;
  missilDireita.style.bottom = `${alturaDeRepouso}vh`;

  missilEsquerda.style.left = `${modificarNave + 0.5}vw`;
  missilDireita.style.left = `${modificarNave + 5.1}vw`;

  missilEsquerda.style.display = 'block';
  missilDireita.style.display = 'block';

  estadoDisparo = 0;
}

function dispararMissel(e) {
  if (jogoPausado || e.key !== ' ') return;

  if (estadoDisparo === 0 && !missilEsqAtivo) {
    missilEsqAtivo = true;
    dispararMissil(missilEsquerda, alturaDeRepouso, () => {
      estadoDisparo = 1;
    });
  } else if (estadoDisparo === 1 && !missilDirAtivo) {
    missilDirAtivo = true;
    dispararMissil(missilDireita, alturaDeRepouso, () => {
      estadoDisparo = 2;
    });
  } else if (estadoDisparo === 2) {
    reiniciarMisseis();
  }
}

document.addEventListener('keydown', dispararMissel);


function moverAliens() {
  const saida = 100;
  const chegada = 20;
  const velocidade = 0.25 * fase;
  let derrota = false;

  const aliens = document.querySelectorAll('.alien');

  aliens.forEach(alien => {
    let posicaoAtual = saida;

    const mover = setInterval(() => {
      if (jogoPausado) { return };
      if (posicaoAtual <= chegada) {
        alien.style.bottom = `${chegada}vh`;
        clearInterval(mover);
        if (!derrota && alien.style.display != "none") {
          derrota = true;
          detectarDerrota();
        }
        return;
      }

      alien.style.bottom = `${posicaoAtual}vh`;
      posicaoAtual -= velocidade;
    }, 100);
    intervalosAliens.push(mover);
  });
}

moverAliens();

vida = 3;
vidaElement = document.getElementById('vidas');

function gameover() {
  document.getElementById("gameover").style.display = "flex";
  ligarDesligarCronometro();
  jogoPausado = true;
  impausavel = true;
  fim = true;
}
function atualizarVida() {
  vida--;
  if (vida <= 0) {
    gameover();
  }
  vidaElement.innerText = `LIFE: ` + vida;
}
function detectarDerrota() {

  setTimeout(() => {
    atualizarVida();
    if (fim) { return };
    document.getElementById("perder").style.display = "flex";
    jogoPausado = true;
    impausavel = true;
    ligarDesligarCronometro();
  }, 100);

  setTimeout(() => {
    if (fim) { return };
    document.getElementById("perder").style.display = "none";
    jogoPausado = false;
    impausavel = false;
    ligarDesligarCronometro();
    reiniciar();
  }, 1900);
}

function reiniciar() {
  const aliens = document.querySelectorAll('.alien');

  aliens.forEach(alien => {
    alien.style.bottom = '100vh';
    alien.style.display = 'block';
  });

  moverAliens();
  reiniciarMisseis();

  vitoria = false;
}

document.addEventListener("keydown", (e) => {
  if ((e.key === 'p' || e.key === 'P') && !impausavel) {
    jogoPausado = !jogoPausado;

    if (jogoPausado) {
      clearInterval(intervalo);
      intervalo = null;
      document.getElementById("pausado").style.display = "flex";
    } else {
      iniciarCronometro();
      document.getElementById("pausado").style.display = "none";
    }
  }
});

function colisao(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

let pontos = 0;
let pontosElement = document.getElementById("pontos");

function atualizarPontos(){
  pontos++;
  pontosElement.innerText = `ALIEN: ` + pontos;
}
function verificarColisao() {
  const aliens = document.querySelectorAll('.alien');

  aliens.forEach(alien => {
    if(alien.style.display === "none"){return};
    const  colisaoEsquerda = colisao(missilEsquerda, alien);
    const  colisaoDireita = colisao(missilDireita, alien);

    if (colisaoEsquerda || colisaoDireita){
      alien.style.display = 'none';

      atualizarPontos();

      if(colisaoEsquerda){
        missilEsquerda.style.display = 'none';
      } else if(colisaoDireita){
        missilDireita.style.display = 'none';
      }
    }
  });
}

setInterval(() => {
  if(!jogoPausado) {
    verificarColisao();
  }
}, 100);

function verificarVitoria(){
  const aliens = document.querySelectorAll('.alien');
  let aliensAbatidos = 0;

  aliens.forEach(alien => {
    if(alien.style.display === "none"){
      aliensAbatidos++;
    }
  });

  if(aliensAbatidos === 3 && vitoria === false){
    fase++;
    if(fase === 5){
      fim = true;
      mensagemVitoriaTotal();
    }
    vitoria = true;
    atualizarFundo();
    mensagemVitoria();
  }
}

function mensagemVitoria(){
  setTimeout(() => {
    if (fim) { return };
    document.getElementById("vencer").style.display = "flex";
    jogoPausado = true;
    impausavel = true;
    ligarDesligarCronometro();
  }, 100);

  setTimeout(() => {
    if (fim) { return };
    document.getElementById("vencer").style.display = "none";
    jogoPausado = false;
    impausavel = false;
    ligarDesligarCronometro();

    intervalosAliens.forEach(id => clearInterval(id));
    intervalosAliens = [];

    reiniciar();
  }, 900);
}

function mensagemVitoriaTotal(){
  document.getElementById("finalizar").style.display = "flex";
  jogoPausado = true;
  impausavel = true;
  ligarDesligarCronometro();
  reiniciarMisseis();
}

function atualizarFundo(){
  const fundo = document.body;

  if(fase === 2){
    fundo.style.backgroundImage = "url('images/Fundo2.jpg')";
  } else if(fase === 3){
    fundo.style.backgroundImage = "url('images/Fundo3.jpg')";
  } else if(fase === 4){
    fundo.style.backgroundImage = "url('images/Fundo4.jpg')";
  }
}

setInterval(() => {
  verificarVitoria();
}, 100);




