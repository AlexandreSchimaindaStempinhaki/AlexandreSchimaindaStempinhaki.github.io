function ex02() {
    const form = document.querySelector('#form02');
    const input_entrada = form.querySelector('input[name = "in_02"]').value;

    const valores_array = input_entrada.trim().split(/\s+/);

    const resultado = media_arrow(...valores_array);
    
    console.log(resultado);
    const saida = document.getElementById('output');
    saida.textContent = resultado.media;
    form.reset();
    console.log(resultado);
}


const media_arrow = (...valores) => {
    const numeros = valores.map(Number);
    const soma = numeros.reduce((acc, val) => acc + val, 0);
    const media = soma / numeros.length;
    return {media};
}



