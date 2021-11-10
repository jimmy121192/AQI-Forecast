import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

const generateChartData = (data) => {
  const chartData = [];

  if (data && data.forecast) {
    for (let i = 0; i < 7; i++) {
      let newDate = data.forecast.daily.o3[i]
        ? data.forecast.daily.o3[i].day
        : null;

      let o3 = data.forecast.daily.o3[i] ? data.forecast.daily.o3[i].avg : null;
      let pm25 = data.forecast.daily.pm25[i]
        ? data.forecast.daily.pm25[i].avg
        : null;
      let pm10 = data.forecast.daily.pm10[i]
        ? data.forecast.daily.pm10[i].avg
        : null;

      chartData.push({
        date: newDate,
        o3: o3,
        pm25: pm25,
        pm10: pm10,
      });
    }
  }

  return chartData;
};

const AqiChart = ({ data }) => {
  //Create Chart

  let chart = am4core.create("chartdiv", am4charts.XYChart);

  // Increase contrast by taking evey second color
  chart.colors.step = 4;

  // Add data
  chart.data = generateChartData(data);

  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;

  // Create series
  function createAxisAndSeries(field, name, opposite, bullet) {
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if (chart.yAxes.indexOf(valueAxis) !== 0) {
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.tensionX = 0.8;
    series.showOnInit = true;

    let interfaceColors = new am4core.InterfaceColorSet();

    switch (bullet) {
      case "triangle":
        bullet = series.bullets.push(new am4charts.Bullet());
        bullet.width = 12;
        bullet.height = 12;
        bullet.horizontalCenter = "middle";
        bullet.verticalCenter = "middle";

        let triangle = bullet.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor("background");
        triangle.strokeWidth = 2;
        triangle.direction = "top";
        triangle.width = 12;
        triangle.height = 12;
        break;

      case "rectangle":
        bullet = series.bullets.push(new am4charts.Bullet());
        bullet.width = 10;
        bullet.height = 10;
        bullet.horizontalCenter = "middle";
        bullet.verticalCenter = "middle";

        let rectangle = bullet.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor("background");
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;

      default:
        bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = interfaceColors.getFor("background");
        bullet.circle.strokeWidth = 2;
        break;
    }

    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;

    return series;
  }

  createAxisAndSeries("o3", "O3", false, "circle");
  let series2 = createAxisAndSeries("pm25", "PM25", true, "triangle");
  let series3 = createAxisAndSeries("pm10", "PM10", true, "rectangle");

  // Configure axis tooltips
  series3.yAxis.adapter.add("getTooltipText", function (text, target) {
    let cursorPosition = chart.cursor.yPosition;
    return text + " : " + series2.yAxis.getTooltipText(cursorPosition);
  });

  series2.yAxis.cursorTooltipEnabled = false;

  // Add legend
  chart.legend = new am4charts.Legend();

  // Add cursor
  chart.cursor = new am4charts.XYCursor();

  let title = chart.titles.create();
  title.text = "AQI Forecast";
  title.fontSize = 25;
  title.marginBottom = 30;

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default AqiChart;
