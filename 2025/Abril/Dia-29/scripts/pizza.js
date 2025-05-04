    google.charts.load('current', {'packages':['corechart'],});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Carro', 'Conceitos'],
            ['A', 189],
            ['B', 228],
            ['C', 211],
            ['D', 187],
        ]);

        var options = {
            title: 'CONCEITOS',
            colors: ['#CCC', '#999', '#666', '#333'],
            is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }