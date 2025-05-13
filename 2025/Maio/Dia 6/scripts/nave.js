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
        
        estadoDisparo = 0;
    }
}

document.addEventListener('keydown', dispararMissel);

document.addEventListener('keydown', (e) => {
    if(e.key === 'p' || e.key === 'P'){
        jogoPausado = !jogoPausado;
    }
})

