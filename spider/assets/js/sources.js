if (document.getElementById('sources-graph-container')) {
    Highcharts.chart('sources-graph-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Activity by Source (Weekly)'
        },
        xAxis: {
            categories: ['Apr 07 - 13', 'Apr 14 - 20', 'Apr 21 - 02', 'Mar 03 - 09', 'Mar 10 - 16']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Documents'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Regulation',
            data: [15, 23, 14, 7, 12]
        }, {
            name: 'News',
            data: [24, 20, 13, 32, 11]
        }]
    });
}

if (document.getElementById('topics-graph-container')) {
    Highcharts.chart('topics-graph-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Activity by Topic (Monthly)'
        },
        xAxis: {
            categories: ['Oct 2018', 'Nov 2018', 'Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Documents'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Topic A',
            data: [15, 23, 14, 7, 12, 31]
        }, {
            name: 'Topic B',
            data: [24, 20, 13, 32, 11, 4]
        }]
    });
}