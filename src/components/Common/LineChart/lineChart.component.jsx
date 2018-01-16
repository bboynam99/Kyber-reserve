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
      "valueAxes": [{
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "title": "Buy",
        "balloonText": "[[title]]: <b>[[value]]</b>",
        "bullet": "round",
        "bulletSize": 5,
        "bulletBorderColor": "#ffffff",
        "bulletBorderAlpha": 1,
        "bulletBorderThickness": 2,
        "valueField": "buy"
      }, {
        "title": "Sell",
        "balloonText": "[[title]]: <b>[[value]]</b>",
        "bullet": "round",
        "bulletSize": 5,
        "bulletBorderColor": "#ffffff",
        "bulletBorderAlpha": 1,
        "bulletBorderThickness": 2,
        "valueField": "sell"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      // "categoryField": "index",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "labelsEnabled": false
      },
      "legend": {
        "spacing": 100,
        "valueWidth": 70
      }
    };


    return (
      <LineChartView
        config={config}
      />

    );
  }
}
