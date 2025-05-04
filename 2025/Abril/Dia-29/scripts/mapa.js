google.charts.load('current', {'packages':['geochart'],});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Country', 'Frequência'],
            ['United States', 300],
            ['Brazil', 400],
            ['France', 600],
            ['Japan', 500],
        ]);

        var options = {
            colorAxis: {colors: ['dadada', '3d3d3d']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('mapchart'));

        chart.draw(data, options);
    }