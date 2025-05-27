var data_reports = []


function newRelatorio(){
    const form = document.getElementById('formReport');

    const input_data = document.querySelector('input[name = "data"]');

    const select_assunto = document.getElementById('select_subject');
    const input_id_assunto = select_assunto.value;
    const input_nome_assunto = select_assunto.options[select_assunto.selectedIndex].text;

    const select_agente = document.getElementById('select_agent');
    const input_id_agente = select_agente.value;
    const input_nome_agente = select_agente.options[select_agente.selectedIndex].text;

    const table = document.querySelector('#table_report');

    const newRelatorio = {
        id: data_reports.length,
        id_assunto: input_id_assunto,
        id_agente: input_id_agente,
        data: input_data.value
    }

    data_reports.push(newRelatorio);

    const line = document.createElement('tr');

    const col_id = document.createElement('td');
    col_id.textContent = data_reports.length;

    const col_data = document.createElement('td');
    col_data.textContent = input_data.value;

    const col_assunto = document.createElement('td');
    col_assunto.textContent = input_nome_assunto;

    const col_agente = document.createElement('td');
    col_agente.textContent = input_nome_agente;

    line.appendChild(col_id);
    line.appendChild(col_data);
    line.appendChild(col_assunto);
    line.appendChild(col_agente);

    table.appendChild(line);

    input_data.value = '';
    select_assunto.selectedIndex = 0;
    select_agente.selectedIndex = 0;

    drawChart();
}