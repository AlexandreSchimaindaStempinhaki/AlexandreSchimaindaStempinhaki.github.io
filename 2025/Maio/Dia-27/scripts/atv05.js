
function ex05() {
    
    const form = document.querySelector('#form05')
    const input = form.querySelector('input[name="in_05"]').value
    
    const objeto = construtora(input);
    
    resolve05(objeto);

    form.reset();
}

function resolve05(obj) {
    const saida = document.getElementById('output');

    let conteudo = '';
    
    Object.entries(obj).forEach(([chave, valor]) => {
            conteudo += chave + ": " + valor + "<br>";
    });
    saida.innerHTML = conteudo
}

function construtora(data) {
    return JSON.parse(data);
}

//{"id": 1, "nome": "Gil Eduardo", "media": 7.6}
