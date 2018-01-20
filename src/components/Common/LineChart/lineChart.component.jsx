import React, { Component } from 'react'

import LineChartView from "./lineChart.view"
import { stretchArray } from "../../../services/utils/converter"
export default class LineChart extends Component {

  constructor() {
    super();
  }

  render() {

    let dataProvider = this.props.data
    let config = {
      "type": "serial",
      "theme": "light",
      "dataProvider": dataProvider,
      "gridAboveGraphs": true,
      "startDuration": 1,
      "categoryField": "date",
      "dataDateFormat": "YYYY-MM-DD",
      "pathToImages": "http://cdn.amcharts.com/lib/3/images/",

      "valueAxes": [{
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      }],
      
      "graphs": [{
        "id": "g1",
        "title": "Buy",
        "balloonText": "[[title]]: <b>[[value]]</b>",
        "bullet": "round",
        "bulletSize": 5,
        "bulletBorderColor": "#ffffff",
        "bulletBorderAlpha": 1,
        "bulletBorderThickness": 2,
        "valueField": "buy",
        "hideBulletsCount": 120,
      }, {
        "id": "g2",
        "title": "Sell",
        "balloonText": "[[title]]: <b>[[value]]</b>",
        "bullet": "round",
        "bulletSize": 5,
        "bulletBorderColor": "#ffffff",
        "bulletBorderAlpha": 1,
        "bulletBorderThickness": 2,
        "valueField": "sell",
        "hideBulletsCount": 120,
      }],

      
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset": 30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA",
      },
      

      "categoryAxis": {
        "parseDates": true,
        "equalSpacing": true,
        "dashLength": 1,
        "minorGridEnabled": true,

        "minPeriod": "fff",
        "dateFormats": [{
          "period": "fff",
          "format": "NN:SS:QQQ"
        }, {
          "period": "ss",
          "format": "NN:SS:QQQ"
        }, {
          "period": "mm",
          "format": "JJ:NN"
        }, {
          "period": "hh",
          "format": "JJ:NN"
        }, {
          "period": "DD",
          "format": "MMM DD"
        }, {
          "period": "WW",
          "format": "MMM DD"
        }, {
          "period": "MM",
          "format": "MMM"
        }, {
          "period": "YYYY",
          "format": "YYYY"
        }]
      },
      "legend": {
        "spacing": 100,
        "valueWidth": 70
      },

      "chartCursor": {
        "valueBalloonsEnabled": true,
        "categoryBalloonDateFormat": "MMM DD, NN:SS",
      }
    };

    return (
      <LineChartView
        config={config}
      />

    );
  }
}
