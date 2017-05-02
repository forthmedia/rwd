// Grid on/off manager 
var Grid = function() {
    // singleton
    if (Grid.prototype._instance)
        return Grid.prototype._instance;

    Grid.prototype._instance = this;

    // private
    var grid_container = document.getElementById('grid-container');
    var grid_state = document.getElementById('grid_state');
    var grid_switch = document.getElementById('grid_switch');
    var grid_state_menu = document.getElementById('grid_state_menu');

    // protected
    this.Handler = function () {
        if (grid_container.classList.contains('hidden')) {
            grid_container.classList.remove('hidden');
            grid_state.innerHTML = 'On';
            grid_switch.classList.remove('fm-blue-hover');
            grid_switch.classList.add('fm-black-hover');
            grid_state_menu.innerHTML = 'On';            
        } else {
            grid_container.classList.add('hidden');
            grid_state.innerHTML = "Off";
            grid_switch.classList.remove('fm-black-hover');
            grid_switch.classList.add('fm-blue-hover');
            grid_state_menu.innerHTML = "Off";
        }                
    }
};

// Menu manager
var Menu = function() {
    // singleton
    if (Menu.prototype._instance)
        return Menu.prototype._instance;

    Menu.prototype._instance = this;

    // private
    var menu_mobile = document.getElementById('menu_mobile');
    var meun_switch = document.getElementById('menu_switch');

    var home = document.getElementById('home');
    var pictures = document.getElementById('pictures');
    var data = document.getElementById('data');

    // protected
    this.ShowMenuHandler = function() {
        if (menu_mobile.classList.contains('hidden')) {
            menu_mobile.classList.remove('hidden');
            menu_switch.classList.remove('fm-black-hover');
            menu_switch.classList.add('fm-white-hover');
        } else {
            menu_mobile.classList.add('hidden');
            menu_switch.classList.remove('fm-white-hover');
            menu_switch.classList.add('fm-black-hover');
        }        
    }

    this.Show = function (item) {
        hideAll();
        var show = document.getElementById(item);
        show.classList.remove('hidden');
    }

    this.HideMobile = function() {
        menu_mobile.classList.add('hidden');
        menu_switch.classList.remove('fm-white-hover');
        menu_switch.classList.add('fm-black-hover');
    }

    var hideAll = function () {
        if (! home.classList.contains('hidden')) home.classList.add('hidden');
        if (! pictures.classList.contains('hidden')) pictures.classList.add('hidden');
        if (! data.classList.contains('hidden')) data.classList.add('hidden');
    } 
};

// Data Visualization Hanlder
var Chart = function() {
    // singleton
    if (Chart.prototype._instance)
        return Chart.prototype._instance;

    Chart.prototype._instance = this;

    //protected
    this.InitBarChart = function() {
        nv.addGraph(function() {
            var width = 600;
            var height = 300;
            var chart = nv.models.discreteBarChart();
                chart.x(function(d) { return d.label });
                chart.y(function(d) { return d.value });
                chart.showValues(true);
                chart.tooltip.enabled(false);

            d3.select('#bar_chart svg')
                .attr('perserveAspectRatio', 'xMinYMid')
                .datum(barData())

            setChartViewBox();
            function setChartViewBox() {
                var w = width,
                    h = height;
                chart
                    .width(w)
                    .height(h);
                d3.select('#bar_chart svg')
                    .attr('viewBox', '0 0 ' + w + ' ' + h)
                    .transition().duration(500)
                    .call(chart);
            }
            
        nv.utils.windowResize(chart.update);
        return chart;
        });    
    } // Init Bar Chart

    this.InitLineChart = function() {
        nv.addGraph(function() {
            var width = 600;
            var height = 300;
            var chart = nv.models.lineChart();
            chart.useInteractiveGuideline(false);
            chart.tooltip.enabled(false);

            chart.xAxis
                .tickFormat(d3.format(',r'));
            chart.lines.dispatch.on("elementClick", function(evt) {
                console.log(evt);
            });
            chart.yAxis
                .axisLabel('Amplitude')
                .tickFormat(d3.format(',.2f'));

            d3.select('#line_chart svg')
                .attr('perserveAspectRatio', 'xMinYMid')
                .datum(lineData());
            setChartViewBox();

            function setChartViewBox() {
                var w = width,
                    h = height;
                chart
                    .width(w)
                    .height(h);
                d3.select('#line_chart svg')
                    .attr('viewBox', '0 0 ' + w + ' ' + h)
                    .transition().duration(500)
                    .call(chart);
            }

        nv.utils.windowResize(chart.update);
        return chart;
        });     
    } //Init Line Chart

    //helpers
    function barData() {
        return  [ 
            {
            key: "Cumulative Return",
            values: [
                { 
                "label" : "A" ,
                "value" : 34.765
                } , 
                { 
                "label" : "B" , 
                "value" : -55.349
                } , 
                { 
                "label" : "C" , 
                "value" : 89.807
                } , 
                { 
                "label" : "D" , 
                "value" : 144.459
                } , 
                { 
                "label" : "E" ,
                "value" : -33.194
                } , 
                { 
                "label" : "F" , 
                "value" : -98.079
                } , 
                { 
                "label" : "G" , 
                "value" : 13.925
                } , 
                { 
                "label" : "H" , 
                "value" : 96.138
                }
            ]
        }
    ]
    }

    function lineData() {
        var sin = [],
            cos = [];
        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y:  Math.sin(i/10) });
            cos.push({x: i, y: .5 * Math.cos(i/10)});
        }
        return [
            {
                values: sin,
                key: "Sine Wave",
                color: "#FF9900"
            },
            {
                values: cos,
                key: "Cosine Wave",
                color: "#FF0033"
            }
        ];
    }
};