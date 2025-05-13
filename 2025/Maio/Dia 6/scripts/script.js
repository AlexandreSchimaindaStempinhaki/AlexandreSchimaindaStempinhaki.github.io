const nave = document.getElementById('nave');
const missilEsquerda = document.querySelector('.missil.esquerda');
const missilDireita = document.querySelector('.missil.direita');

const velocidade = 0.75;

let modificarNave = 0;
let posicaoNave = 50;
let jogoPausado = false;
let impausavel = false;
let fim = false;

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

function ligarDesligarCronometro(){
  if(intervalo !== null){
    clearInterval(intervalo);
    intervalo = null;
  } else{
    iniciarCronometro();
  }
}

document.addEventListener('keydown', moverNave);



let estadoDisparo = 0;
let alturaDeRepouso = 2;
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
}

document.addEventListener('keydown', dispararMissel);


function moverAliens() {
  const saida = 100;
  const chegada = 20;
  const velocidade = 1;
  let derrota = false;

  const aliens = document.querySelectorAll('.alien');

  aliens.forEach(alien => {
    let posicaoAtual = saida;

    const mover = setInterval(() => {
      if (posicaoAtual <= chegada) {
        if (jogoPausado) { return };
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
    }, 30);
  });
}

moverAliens();

vida = 3;
vidaElement = document.getElementById('vidas');

function gameover(){
  document.getElementById("gameover").style.display = "flex";
  ligarDesligarCronometro();
  jogoPausado = true;
  impausavel = true;
  fim = true;
}
function atualizarVida(){
  vida--;
  if(vida <= 0){
    gameover();
  }
  vidaElement.innerText = `LIFE: ` + vida;
}
function detectarDerrota() {

  setTimeout(() =>{
    atualizarVida();
    if(fim){return};
    document.getElementById("perder").style.display = "flex";
    jogoPausado = true;
    impausavel = true;
    ligarDesligarCronometro();
  }, 100);

  setTimeout(() => {
    if(fim){return};
    document.getElementById("perder").style.display = "none";
    jogoPausado = false;
    impausavel = false;
    ligarDesligarCronometro();
    reiniciar();
  }, 1900);
}

function reiniciar(){
  const aliens = document.querySelectorAll('.alien');

  aliens.forEach(alien => {
    alien.style.bottom = '90vh';
    alien.style.display = 'block';
  });
  moverAliens();

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
})

