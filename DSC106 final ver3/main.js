function init(){
    var data = [{
        "hc-key": "eu",
        "value": 37
      }, {
        "hc-key": "oc",
        "value": 3
      }, {
        "hc-key": "af",
        "value": 0.3
      }, {
        "hc-key": "as",
        "value": 12
      }, {
        "hc-key": "na",
        "value": 37
      }, {
        "hc-key": "sa",
        "value": 10
      }];

    avgPlayer = loadJSON('./trend.json');
    plotMap(data);
    plotBar();
    plotWord();
    plotPie();
    avgPlayer.then(function (stocks) {
        plotStocks(stocks);
    })
    plotTime();
}

async function loadJSON(path) {
    let response = await fetch(path);
    let dataset = await response.json();
    return dataset;
}

document.addEventListener('DOMContentLoaded', init, false); 

function plotMap(data){
    Highcharts.mapChart('myMap', {
        // chart: {
        //     type: 'heatmap',
        // },
        title: {
          text: 'Player Distribution in World Map'
        },
        plotOptions: {
          map: {
            point: {
              events: {
                click: function() {
                  $('#container2').trigger(this['hc-key']);
                }
              }
            }
          }
        },
        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
            ]
        },
        
        series: [{
          data: data,
          mapData: Highcharts.maps['custom/world-continents'],
          joinBy: 'hc-key',
          name: 'Percentage of Players',
          states: {
            hover: {
              color: '#2196F3'
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }]
      });
}

function plotBar() {
    Highcharts.chart('myBar', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Number of Ratings'
        },
        xAxis: {
            categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Users'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
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
                    enabled: true
                }
            }
        },
        series: [{
            name: 'PS4',
            data: [31, 10, 11, 8, 4, 12, 17, 18, 39, 37, 57]
        }, {
            name: 'PC',
            data: [3, 1, 0, 2, 3, 3, 2, 6, 20, 10, 23]
        }]
    });
}

function plotWord(){
    data = [{name: 'game', weight: 530}, {name: 'fun', weight: 231}, {name: 'fall', weight: 119}, 
    {name: 'like', weight: 107}, {name: 'guys', weight: 96}, {name: 'more', weight: 93}, 
    {name: 'very', weight: 86}
]
    Highcharts.chart('myWord', {
        accessibility: {
            screenReaderSection: {
                beforeChartFormat: '<h5>{chartTitle}</h5>' +
                    '<div>{chartSubtitle}</div>' +
                    '<div>{chartLongdesc}</div>' +
                    '<div>{viewTableButton}</div>'
            }
        },
        series: [{
            type: 'wordcloud',
            data: data,
            name: 'Occurrences'
        }],
        title: {
            text: 'Wordcloud of Review'
        }
    });
}

function plotPie(){
    Highcharts.chart('myPie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Category of Games',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Categories',
            innerSize: '50%',
            data: [
                ['Races', 36],
                ['Survival', 20],
                ['Team', 28],
                ['Finals', 16],
            ]
        }]
    });
    
}

function plotStocks(stocks) {
    let nPlayer = [];
    for (datum of stocks) {
        nPlayer.push([datum['Date'], datum['#players']]);
    }
    Highcharts.chart('myStock', {
        chart: {
            zoomType: 'x'
        },
        exporting: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Number of Players Per Day Since Release'
        },
        // subtitle: {
        //     text: 'Average Number of Players'
        // },
        xAxis: {
            type: 'datetime',
            
        },
        // xAxis:[{
        //     labels:{
        //        formatter:function(){
        //            return Highcharts.dateFormat('%Y %M %d',this.value);
        //        }
        //     }
        //   }],
          
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            crosshairs: [{
                width: 1,
                color: 'black'
            }, {
                width: 1,
                color: 'black'
            }]
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0
                    },
                    stops: [
                        [0, "#25d6e990"],
                        [1, "#25d6e990"]
                    ]
                }
            }
        },
        series: [{
            type: 'area',
            name: 'Number of Players',
            data: nPlayer
        }]
    });
}


function plotTime() {
    Highcharts.chart('myTime', {
        chart: {
            type: 'timeline'
        },
        accessibility: {
            screenReaderSection: {
                beforeChartFormat: '<h5>{chartTitle}</h5>' +
                    '<div>{typeDescription}</div>' +
                    '<div>{chartSubtitle}</div>' +
                    '<div>{chartLongdesc}</div>' +
                    '<div>{viewTableButton}</div>'
            },
            point: {
                valueDescriptionFormat: '{index}. {point.label}. {point.description}.'
            }
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        title: {
            text: 'Timeline of Fall Guys'
        },
        colors: [
            '#4185F3',
            '#406AB2',
            '#3B4A68'
        ],
        series: [{
            data: [{
                name: 'Season 1',
                label: '8 August 2020 – 7 October 2020',
                description: 'The original season.'
            }, {
                name: 'Season 2',
                label: '8 October 2020 - 14 December 2020',
                description: 'Medieval-themed, with added maps and cosmetics with the same theme.[23] Other cosmetics have been added along the way too, including the added feature to change nicknames and banners.'
            }, {
                name: 'Season 3',
                label: '15 December 2020 - Current',
                description: 'Winter-themed'
            }]
        }]
    });
}