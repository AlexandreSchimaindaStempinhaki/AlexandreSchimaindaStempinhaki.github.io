const data_subjects = []

function newAssunto(){
    const form = document.getElementById('formSubjected');

    const input_nome = document.querySelector('input[name = "descricao"]');

    const table = document.querySelector('#table_subject');

    const newSubject = {
        id: data_subjects.length,
        nome: input_nome.value
    }

    data_subjects.push(newSubject);


    const line = document.createElement('tr');

    const col_id = document.createElement('td');
    col_id.textContent = data_subjects.length;

    const col_nome = document.createElement('td');
    col_nome.textContent = input_nome.value;

    line.appendChild(col_id);
    line.appendChild(col_nome);

    table.appendChild(line);

    input_nome.value = ''; 

    const select = document.getElementById('select_subject');
    const option = document.createElement('option');
    option.value = newSubject.id;
    option.textContent = newSubject.nome;
    select.appendChild(option);
}