var data_agents = [];

function newAgente(){
    const form = document.getElementById('formAgent');

    const input_nome = document.querySelector('input[name = "nome"]');

    const select = document.getElementById('select_regional');
    const input_id = select.value;
    const nome_regional = select.options[select.selectedIndex].text;

    const table = document.querySelector('#table_agent');

    const newAgente = {
        id : data_agents.length,
        id_regiao : input_id.value,
        nome_gerente : input_nome.value
    }

    data_agents.push(newAgente);

    const line = document.createElement('tr');

    const col_id = document.createElement('td');
    col_id.textContent = data_agents.length;

    const col_nome = document.createElement('td');
    col_nome.textContent = input_nome.value;

    const col_regional = document.createElement('td');
    col_regional.textContent = nome_regional;

    line.appendChild(col_id);
    line.appendChild(col_nome);
    line.appendChild(col_regional);

    table.appendChild(line);

    input_nome.value = '';
    select.selectedIndex = 0;

    const select_agente = document.getElementById('select_agent');
    const option = document.createElement('option');
    option.value = newAgente.id;
    option.textContent = newAgente.nome_gerente;
    select_agente.appendChild(option);

    drawChart();
}


