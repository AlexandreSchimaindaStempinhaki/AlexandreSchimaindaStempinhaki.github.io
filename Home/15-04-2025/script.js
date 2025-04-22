function colorChange(elemento){

    document.querySelectorAll('.item').forEach(item => item.style.borderColor = "transparent");
    elemento.style.borderColor = "#474A51";

    const cor = getComputedStyle(elemento).backgroundColor;
    document.documentElement.style.setProperty('--cor-selecionada', cor);
}

function radiusChange(elemento){

    document.querySelectorAll('.formato').forEach(item => item.style.borderColor = "transparent");
    elemento.style.borderColor = "#474A51";

    const borda = getComputedStyle(elemento).borderRadius;
    document.querySelectorAll('.quadradao').forEach(item => item.style.borderRadius = borda);
}

function sizeChange(elemento){

    const entrada = document.getElementById('tamanho');

    entrada.addEventListener('input', function() { /*Era para deixar mais suave a transição, mas funcionou bem pouco*/
            tamanho = entrada.value + "px";
            document.querySelectorAll('.quadradao').forEach(item => {item.style.width = tamanho; item.style.height = tamanho});
    });
};


function flexChange(elemento, filtro){
    const direcao = elemento.value.toLowerCase();
    const campo = document.querySelector('.campo');

    if(filtro === "Flex-Direction"){
        campo.style.flexDirection = direcao;
    } else if(filtro === "Justify-Content"){
        campo.style.justifyContent = direcao;
    } else if(filtro === "Align-Items"){
        campo.style.alignItems = direcao;
    }
}