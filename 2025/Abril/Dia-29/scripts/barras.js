    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Element', 'Frequência', { role: 'style' }],
            ['1º Bim', 89.5, '#000000'],
            ['2º Bim', 90.5, '#D3D3D3'],
            ['3º Bim', 86.25, '000000'],
            ['4º Bim', 87.4, 'D3D3D3' ],
        ]);

        var options = {
            title: 'Frequência',
                        hAxis:{
                ticks: [86, 87, 88, 89, 90, 91]
            },
            legend: 'none'
        };

        var chart = new google.visualization.BarChart(document.getElementById('barchart'));

        chart.draw(data, options);

    }