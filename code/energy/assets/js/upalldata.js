
var counter;
setInterval(function() {
  // Call a function repetatively with 5 Second interval
  data1();
}, 1000); //5000mSeconds update rate


function data1() {
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // DEFINE CHART LOCATIONS (IDS)

  $.getJSON("config/upall.php",
      function(result) {
          let chart1Id = 'chart1';
          let chart2Id = "chart2";
          let chart3Id = "chart3";
          let chart4Id = "chart4";
          let chart5Id = "chart5";
          let chart6Id = "chart6";

          var akhir = result.length - 1;
          console.log(result);
          let Volt = result[akhir].Volt;
          let Freku = result[akhir].Frek;
          let Amperu = result[akhir].Amper;
          let watt = result[akhir].watt;
          let kwh = result[akhir].kwh;
          let update = result[akhir].update_time;
          let biaya = result[akhir].biaya;

          let sales = [[19.98], [9.99], [9.99], [29.97], [9.99]];
          let arr_update = [];
          let arr_kwh  =[];
          let arr_amper  =[];
          let arr_watt  =[];
          let arr_volt  =[];
          let arr_biaya  =[];
          for (var i in result)
          {
            arr_update.push(result[i].update_time);
            arr_kwh.push(result[i].kwh);
            arr_amper.push(result[i].Amper);
            arr_watt.push(result[i].watt);
            arr_volt.push(result[i].Volt);
            arr_biaya.push(result[i].biaya);
           }
           console.log(arr_update);

          // Chart 1
          let chart1Data = {
              type: 'ring',
              globals: {
                  fontFamily: 'Poppins',
              },
              backgroundColor: 'transparent',
              plot: {
                  valueBox: {
                      text: 'RP.' + biaya,
                      fontSize: '24px',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      placement: 'center',
                  },
                  slice: '80%',
              },
              plotarea: {
                  margin: '0px 0px 0px 0px',
              },
              series: [{
                      values: ["KWH:" + kwh],
                      backgroundColor: 'var(--black)',
                      borderWidth: '5px',
                      shadow: false,
                  },
                  {
                      values: ["Watt:" + watt],
                      backgroundColor: 'var(--yellow)',
                      borderWidth: '5px',
                      shadow: true,
                  },
                  {
                      values: ["Amper:" + Amperu],
                      backgroundColor: 'var(--red)',
                      borderWidth: '5px',
                      shadow: false,
                  },
              ],
          };


          let chart2Data = {
            "type": "line",
            "backgroundColor": 'transparent',
            "utc": true,
            "title": {
              "text": "Biaya",
              "font-size": "24px",
              "adjust-layout": true
            },
            "plotarea": {
              "margin": "dynamic 45 60 dynamic",
            },
            "legend": {
              "layout": "float",
              "background-color": "none",
              "border-width": 0,
              "shadow": 0,
              "align": "center",
              "adjust-layout": true,
              "toggle-action": "remove",
              "item": {
                "padding": 7,
                "marginRight": 17,
                "cursor": "hand"
              }
            },
            "scale-x": {
              "min-value": 0,
              "shadow": 0,
              "step": 3600000,
              "transform": {
                labels: arr_update,
                "item": {
                  "visible": false
                }
              },
              "label": {
                "visible": false
              },
              "minor-ticks": 0
            },
            "scale-y": {
              "line-color": "#f6f7f8",
              "shadow": 0,
              "guide": {
                "line-style": "dashed"
              },
              "label": {
                "text": "Page Views",
              },
              "minor-ticks": 0,
              "thousands-separator": ","
            },
            "crosshair-x": {
              "line-color": "#efefef",
              "plot-label": {
                "border-radius": "5px",
                "border-width": "1px",
                "border-color": "#f6f7f8",
                "padding": "10px",
                "font-weight": "bold"
              },
              "scale-label": {
                "font-color": "#000",
                "background-color": "#f6f7f8",
                "border-radius": "5px"
              }
            },
            "tooltip": {
              "visible": false
            },
            "plot": {
              "highlight": true,
              "tooltip-text": "%t views: %v<br>%k",
              "shadow": 0,
              "line-width": "2px",
              "marker": {
                "type": "circle",
                "size": 3
              },
              "highlight-state": {
                "line-width": 3
              },
              "animation": {
                "effect": 1,
                "sequence": 2,
                "speed": 100,
              }
            },
            "series": [{
                "values": arr_biaya,
                "text": "Biaya",
                "line-color": "#007790",
                "legend-item": {
                  "background-color": "#007790",
                  "borderRadius": 5,
                  "font-color": "white"
                },
                "legend-marker": {
                  "visible": false
                },
                "marker": {
                  "background-color": "#007790",
                  "border-width": 1,
                  "shadow": 0,
                  "border-color": "#69dbf1"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#007790",
                }
              },
              {
                "values": arr_kwh,
                "text": "KWH",
                "line-color": "#009872",
                "legend-item": {
                  "background-color": "#009872",
                  "borderRadius": 5,
                  "font-color": "white"
                },
                "legend-marker": {
                  "visible": false
                },
                "marker": {
                  "background-color": "#009872",
                  "border-width": 1,
                  "shadow": 0,
                  "border-color": "#69f2d0"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#009872",
                }
              },
            ]
          };

          // Chart Garis
          let chart3Data = {
            type: 'line',
            backgroundColor: 'transparent',
            title: {
              text: 'Time Series Data with null values',
              adjustLayout: true,
              marginTop: '7px',
              fontColor: '#E3E3E5'
            },
            legend: {
              align: 'center',
              backgroundColor: 'none',
              borderWidth: '0px',
              item: {
                cursor: 'hand',
                fontColor: '#E3E3E5'
              },
              marker: {
                type: 'circle',
                borderWidth: '0px',
                cursor: 'hand'
              },
              verticalAlign: 'top'
            },
            plot: {
              aspect: 'spline',
              lineWidth: '2px',
              marker: {
                borderWidth: '0px',
                size: '5px'
              }
            },
            plotarea: {
              margin: 'dynamic 70'
            },
            scaleX: {
              item: {
                fontColor: '#E3E3E5'
              },
              lineColor: '#E3E3E5',
              labels: arr_update
            },
            scaleY: {
              guide: {
                lineStyle: 'dashed'
              },
              item: {
                fontColor: '#E3E3E5'
              },
              lineColor: '#E3E3E5',
              minorGuide: {
                alpha: 0.7,
                lineColor: '#E3E3E5',
                lineStyle: 'dashed',
                lineWidth: '1px',
                visible: true
              },
              minorTick: {
                lineColor: '#E3E3E5'
              },
              minorTicks: 1,
              tick: {
                lineColor: '#E3E3E5'
              }
            },
            crosshairX: {
              marker: {
                alpha: 0.5,
                size: '7px'
              },
              plotLabel: {
                borderRadius: '3px',
                multiple: true
              },
              scaleLabel: {
                backgroundColor: '#53535e',
                borderRadius: '3px'
              }
            },
            crosshairY: {
              type: 'multiple',
              lineColor: '#E3E3E5',
              scaleLabel: {
                bold: true,
                borderRadius: '3px',
                decimals: 2,
                fontColor: '#2C2C39',
                offsetX: '-5px'
              }
            },
            shapes: [
              {
                type: 'rectangle',
                id: 'view_all',
                backgroundColor: '#53535e',
                borderColor: '#E3E3E5',
                borderRadius: '3px',
                borderWidth: '1px',
                cursor: 'hand',
                label: {
                  text: 'View All',
                  bold: true,
                  fontColor: '#E3E3E5',
                  fontSize: '12px'
                },
                width: '75px',
                height: '20px',
                x: '85%',
                y: '11%'
              }
            ],
            tooltip: {
              borderRadius: '3px',
              borderWidth: '0px'
            },
            preview: {
              adjustLayout: true,
              borderColor: '#E3E3E5',
              label: {
                fontColor: '#E3E3E5'
              },
              mask: {
                backgroundColor: '#E3E3E5'
              }
            },
            series: [
              {
                values: arr_amper,
                lineColor: '#E34247',
                text: "Amper",
                marker: {
                  backgroundColor: '#E34247'
                },
              },
              {
                values: arr_watt,
                lineColor: '#FEB32E',
                text: "Watt",
                marker: {
                  backgroundColor: '#FEB32E'
                }
              },
              {
                values: arr_kwh,
                lineColor: '#31A59A',
                text: "Kwh",
                marker: {
                  backgroundColor: '#31A59A'
                }
              }
            ]
          };

          // CHART 4

          let chart4Data = {
            graphset: [{
              type: 'null',
              x: 0,
              y: 0,
              height: '30%',
              width: '100%',
              backgroundColor: '#2d2d45',
              labels: [{
                id: 'main_label',
                text: Volt +" V",
                fontColor: '#40c4ff',
                fontFamily: 'Bungee',
                fontSize: 80,
                x: '50%',
                y: '90%',
                anchor: 'c'
              }]
            }, {
              type: 'line',
              x: 0,
              y: '30%',
              height: '70%',
              width: '100%',
              backgroundColor: '#2d2d45',
              scaleX: {
                visible: false
              },
              scaleY: {
                visible: false
              },
              plot: {
                aspect: 'spline',
                marker: {
                  visible: false
                }
              },
              series: [{
                values: arr_volt
              }]
            }]
          }

          // CHART 5

          let chart5Data = {
            graphset: [{
              type: 'null',
              x: 0,
              y: 0,
              height: '30%',
              width: '100%',
              backgroundColor: '#2d2d45',
              labels: [{
                id: 'main_label',
                text: Amperu +" A",
                fontColor: '#40c4ff',
                fontFamily: 'Bungee',
                fontSize: 80,
                x: '50%',
                y: '90%',
                anchor: 'c'
              }]
            }, {
              type: 'line',
              x: 0,
              y: '30%',
              height: '70%',
              width: '100%',
              backgroundColor: '#2d2d45',
              scaleX: {
                visible: false
              },
              scaleY: {
                visible: false
              },
              plot: {
                aspect: 'spline',
                marker: {
                  visible: false
                }
              },
              series: [{
                values: arr_amper
              }]
            }]
          }


          // CHART 6

          let chart6Data = {
            graphset: [{
              type: 'null',
              x: 0,
              y: 0,
              height: '30%',
              width: '100%',
              backgroundColor: '#2d2d45',
              labels: [{
                id: 'main_label',
                text: watt +" W",
                fontColor: '#40c4ff',
                fontFamily: 'Bungee',
                fontSize: 80,
                x: '50%',
                y: '90%',
                anchor: 'c'
              }]
            }, {
              type: 'line',
              x: 0,
              y: '30%',
              height: '70%',
              width: '100%',
              backgroundColor: '#2d2d45',
              scaleX: {
                visible: false
              },
              scaleY: {
                visible: false
              },
              plot: {
                aspect: 'spline',
                marker: {
                  visible: false
                }
              },
              series: [{
                values: arr_watt
              }]
            }]
          }

          // RENDER CHARTS
          // -----------------------------

          // Chart BUNDER
          zingchart.render({
              id: chart1Id,
              data: chart1Data,
              height: '300px',
              width: '100%',
          });
          // Chart 2
          zingchart.render({
            id: chart2Id,
            data: chart2Data,
            height: "300px",
            width: "100%",
          });



          //render setiap chart
          zingchart.bind(chart3Id, 'shape_click', function (p) {
            if (p.shapeid == 'view_all') {
              zingchart.exec(p.id, 'viewall');
            }
          });


          // Chart GARIS
          zingchart.render({
              id: chart3Id,
              data: chart3Data,
              height: '100%',
              width: '100%',
          });

          // Chart 4

          zingchart.render({
            id: chart4Id,
            data: chart4Data,
            height: 560,
            width: '100%'
          });

          // Chart 5

          zingchart.render({
            id: chart5Id,
            data: chart5Data,
            height: 560,
            width: '100%'
          });

          // Chart 6

          zingchart.render({
            id: chart6Id,
            data: chart6Data,
            height: 560,
            width: '100%'
          });

          //document.querySelector('zing-grid').data = result;
          document.getElementById("dwatt").innerHTML = watt;
          document.getElementById("dupdate").innerHTML = update;
          document.getElementById("dkwh").innerHTML = kwh;
          document.getElementById("dvolt").innerHTML = Volt;
      });
}

