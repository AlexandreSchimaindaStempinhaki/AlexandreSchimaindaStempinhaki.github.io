
function ex04() {
    
    const form = document.querySelector('#form04')
    const input = form.querySelector('input[name="in_04"]').value

    const resultado = resolve04(input);
    
    const saida = document.getElementById('output');
    saida.textContent = resultado.join(' ');
    form.reset();
}

function resolve04(numeros) {
    const valores = numeros.trim().split(/\s+/).map(Number);
    return valores.filter(filter_perfeito);
}

const filter_perfeito = (val) => {
    if(val <= 1){return false};

    let soma = 0;
    for(let i = 1; i < val; i++){
        if(val % i === 0){
            soma += i;
        }
    }

    return soma === val;
}

