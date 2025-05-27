function ex03() {
    
    const form = document.querySelector('#form03')
    const input = form.querySelector('input[name="in_03"]').value

    const resultado = resolve03(input);
    
    const saida = document.getElementById('output');
    saida.innerHTML = resultado.join('<br>');
    form.reset()
}

function resolve03(str) {
    const valores = str.trim().split(/\s+/).map(Number);

    return valores.map(val => isEven(val)? 'PAR' : 'ÍMPAR');
}

function isEven(val) {
    return val % 2 === 0
}


