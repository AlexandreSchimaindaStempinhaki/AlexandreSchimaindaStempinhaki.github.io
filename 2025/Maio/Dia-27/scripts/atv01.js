function ex01() {
    const form = document.querySelector('#form01');
    const input_entrada = form.querySelector('input[name = "in_01"]').value;

    const valores_array = input_entrada.trim().split(/\s+/);

    const resultado = media(...valores_array);

    const saida = document.getElementById('output');
    saida.textContent = resultado.media;
    form.reset();
}


function media(){
    const valores = Array.from(arguments).map(item => Number(item));
    const soma = valores.reduce((acc, val) => acc + val, 0);
    const media = soma / valores.length;
    return {media};
}



