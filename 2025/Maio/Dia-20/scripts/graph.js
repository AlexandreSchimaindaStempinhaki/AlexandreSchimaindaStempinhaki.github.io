    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Element', 'Density', { role: 'style' }],
            ['Agentes', data_agents.length, '#92E8F1'],            
            ['Assuntos', data_subjects.length, '#9CB2FD'],            
            ['Regionais', data_regionals.length, '#008DD8'],
            ['Relatórios', data_reports.length, '#0C5283' ],
        ]);

        let maior = Math.max(1, data_subjects.length, data_regionals.length, data_agents.length, data_reports.length);

        var options = {
            legend: 'none',
            vAxis: {
                viewWindow: {
                    max: maior,
                    min: 0
                }
            }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('colchart'));

        chart.draw(data, options);
    }
