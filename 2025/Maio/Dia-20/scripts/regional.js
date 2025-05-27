var data_regionals = []

function newRegiao(){
    const form = document.getElementById('formRegional');

    const input_sigla = document.querySelector('input[name = "sigla"]');
    const input_cidade = document.querySelector('input[name = "cidade"]');

    const table = document.querySelector('#table_regional');

    const newRegiao = {
        id: data_regionals.length,
        sigla: input_sigla.value,
        cidade: input_cidade.value
    }

    data_regionals.push(newRegiao);

    const line = document.createElement('tr');

    const col_id = document.createElement('td');
    col_id.textContent = data_regionals.length;

    const col_sigla = document.createElement('td');
    col_sigla.textContent = input_sigla.value;

    const col_cidade = document.createElement('td');
    col_cidade.textContent = input_cidade.value;

    line.appendChild(col_id);
    line.appendChild(col_sigla);
    line.appendChild(col_cidade);

    table.appendChild(line);

    input_sigla.value = '';
    input_cidade.value = '';

    const select = document.getElementById('select_regional');
    const option = document.createElement('option');
    option.value = newRegiao.id;
    option.textContent = newRegiao.sigla;
    select.appendChild(option);

    drawChart();
}

