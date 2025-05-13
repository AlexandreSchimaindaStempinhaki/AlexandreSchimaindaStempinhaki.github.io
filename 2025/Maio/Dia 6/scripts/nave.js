const nave = document.getElementById('nave');
const missilEsquerda = document.querySelector('.missil.esquerda');
const missilDireita = document.querySelector('.missil.direita');

const velocidade = 0.75;

let modificarNave = 0;
let posicaoNave = 50;
let jogoPausado = false;

const limiteEsquerda = 25;
const limiteDireita = 95;

let missilEsqAtivo = false;
let missilDirAtivo = false;


function moverNave(e){
    if (jogoPausado) return;
    if(e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A'){
        if(posicaoNave > limiteEsquerda){
            modificarNave -= velocidade;
            posicaoNave -= velocidade;
        }
    } else if(e.key === 'ArrowRight'  || e.key === 'd' || e.key === 'D'){
        if(posicaoNave < limiteDireita){
            modificarNave += velocidade;
            posicaoNave += velocidade;
        }
    }

    nave.style.left = `${modificarNave}vw`;

    if(!missilEsqAtivo){
        missilEsquerda.style.left = `${modificarNave + 0.5}vw`;
    }
    if(!missilDirAtivo){
        missilDireita.style.left = `${modificarNave + 5.1}vw`;

    }

}

document.addEventListener('keydown', moverNave);



let estadoDisparo = 0;
let alturaDeRepouso = 6;
const alturaMaxima = 87;


const dispararMissil = (missil, alturaInicial, aoFinalizar) => {
    let altura = alturaInicial;
    const intervalo = setInterval(() => {
        if(jogoPausado) {return};
        
        if(altura >= alturaMaxima){
            clearInterval(intervalo);
            missil.style.bottom = `${alturaMaxima}vh`;
            if(typeof aoFinalizar === "function"){
                aoFinalizar();
            }
        } else{
            altura += 1;
            missil.style.bottom = `${altura}vh`
        }
    }, 10);
}

function dispararMissel(e){
    if(jogoPausado || e.key !== ' ') return;

    if(estadoDisparo === 0 &&  !missilEsqAtivo){
        missilEsqAtivo = true;
        dispararMissil(missilEsquerda, alturaDeRepouso, () => {
            estadoDisparo  = 1;
        });
    } else if (estadoDisparo === 1 && !missilDirAtivo){
        missilDirAtivo = true;
        dispararMissil(missilDireita, alturaDeRepouso, () => {
            estadoDisparo  = 2;
        });
    } else if (estadoDisparo === 2){
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

document.addEventListener('keydown', (e) => {
    if(e.key === 'p' || e.key === 'P'){
        jogoPausado = !jogoPausado;
    }
});

// === CONFIGURAÇÕES GERAIS ===
let pontos = 0;
const pontosElementos = document.getElementById('pontos');

function atualizarPlacar() {
  pontosElementos.innerText = `ALIEN: ${pontos}`;
}

// === COLISÃO AABB ===
function colisao(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  );
}

// === CRIAR ALIEN ===
function criarAlien() {
    if(jogoPausado){return};
  const alien = document.createElement('img');
  alien.classList.add('alien');
  alien.src = 'images/Alien.png'
  alien.style.position = 'fixed';
  alien.style.width = '5vw';
  alien.style.height = 'auto';
  alien.style.bottom = '90vh';
  alien.style.left = `${Math.random() * (95 - 25) + limiteEsquerda}vw`;
  document.body.appendChild(alien);

  moverAlien(alien);
  atirarDoAlienComChance(alien);
}

// === MOVER ALIEN DESCENDO ===
function moverAlien(alien) {
  const intervalo = setInterval(() => {
    if (!document.body.contains(alien)) {
      clearInterval(intervalo);
      return;
    }
    if(jogoPausado){return};
    let pos = parseFloat(alien.style.bottom);
    if (pos <= 0) {
      clearInterval(intervalo);
      alien.remove();
    } else {
      alien.style.bottom = `${pos - 0.5}vh`;
    }
  }, 60);
}

// === ATIRAR DO ALIEN COM CHANCE ===
function atirarDoAlienComChance(alien) {
  const intervalo = setInterval(() => {
    if (!document.body.contains(alien)) {
      clearInterval(intervalo);
      return;
    }
    if (Math.random() < 0.05) {
      atirarDoAlien(alien);
    }
  }, 500);
}

// === CRIAR TIRO DO ALIEN ===
function atirarDoAlien(alien) {
  const tiro = document.createElement('div');
  tiro.classList.add('tiro-alien');
  tiro.style.position = 'fixed';
  tiro.style.width = '5px';
  tiro.style.height = '15px';
  tiro.style.background = 'red';
  tiro.style.bottom = alien.style.bottom;
  tiro.style.left = alien.style.left;
  document.body.appendChild(tiro);

  const intervalo = setInterval(() => {
    if (!document.body.contains(tiro)) {
      clearInterval(intervalo);
      return;
    }
    if(jogoPausado){return};
    let pos = parseFloat(tiro.style.bottom);
    if (pos <= 0) {
      clearInterval(intervalo);
      tiro.remove();
    } else {
      tiro.style.bottom = `${pos - 1.5}vh`;
      // Aqui você pode adicionar colisão com a nave
    }
  }, 30);
}

// === CHECAR COLISÃO ENTRE MÍSSEIS E ALIENS ===
function checarColisoes() {
  const aliens = document.querySelectorAll('.alien');
  const misseis = document.querySelectorAll('.missil');

  aliens.forEach(alien => {
    let missel = 0;
    misseis.forEach(missil => {
      if (colisao(alien, missil)) {
        alien.remove();
        missil.style.display = 'none';
        if(missel === 0){
            missilEsqAtivo = true;
        }
        if(missel === 1){
            missilDirAtivo = true;
        }
        pontos += 1;
        atualizarPlacar();
      }
    });
  });
}

// === LOOP DE COLISÃO ===
setInterval(() => {
  if (!jogoPausado) {
    checarColisoes();
  }
}, 100);

// === LOOP PARA GERAR ALIENS ===
setInterval(() => {
  if (!jogoPausado) {
    criarAlien();
  }
}, 2000);

if (verificarColisao(tiroInimigo, nave)) {
    darDano(); // Se colidir com a nave, dá dano
    atualizarVidas();
    clearInterval(intervaloTiro); // Para o movimento do tiro
    tiroInimigo.remove(); // Remove o tiro após a colisão
  }

function darDano() {
    if (vidas > 0) {
      vidas--; // Decrementa a vida
      atualizarVidas(); // Atualiza a exibição das vidas
    }
    if (vidas === 0) {
      alert('Game Over');
      // Pode reiniciar o jogo ou finalizar aqui
    }
  }

  let vidas = 3;
  const vidaElementos = document.getElementById('vida');

