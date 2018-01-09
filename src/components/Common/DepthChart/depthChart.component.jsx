import React, { Component } from 'react'
import AmCharts from "@amcharts/amcharts3-react"

import { stretchArray } from "../../../services/utils/converter"
import { mappingRateForDepthChart } from "../../../services/utils/standardize"

import DepthChartView from "./depthChart.view"

class DepthChart extends Component {

  constructor() {
    super();

    this.state = {
      isOpenModal: false
    };
  }

  render() {
    let balloon = (item, graph) => {
      var txt;
      if (graph.id == "asks") {
        txt = "Ask: <strong>" + formatNumber(item.dataContext.Rate, graph.chart, 4) + "</strong><br />"
          + "Total Quantity: <strong>" + formatNumber(item.dataContext.AskQuantity, graph.chart, 2) + "</strong>";
      }
      else {
        txt = "Bid: <strong>" + formatNumber(item.dataContext.Rate, graph.chart, 4) + "</strong><br />"
          + "Total Quantity: <strong>" + formatNumber(item.dataContext.BidQuantity, graph.chart, 2) + "</strong>";
      }
      return txt;
    }

    let formatNumber = (val, chart, precision) => {
      return AmCharts.formatNumber(
        val,
        {
          precision: precision ? precision : chart.precision,
          decimalSeparator: chart.decimalSeparator,
          thousandsSeparator: chart.thousandsSeparator
        }
      );
    }

    let toggleModal = () => {
      this.setState({ isOpenModal: !this.state.isOpenModal })
    }

    let dataProvider = mappingRateForDepthChart(this.props.rate)
    let microData = stretchArray(dataProvider, 3)

    let config = {
      "type": "serial",
      "theme": "light",
      "dataProvider": dataProvider,
      "graphs": [
        {
          "id": "asks",
          "fillAlphas": 0.1,
          "lineAlpha": 1,
          "lineThickness": 2,
          "lineColor": "#f00",
          "type": "step",
          "valueField": "AskQuantity",
          "balloonFunction": balloon
        },
        {
          "id": "bids",
          "fillAlphas": 0.1,
          "lineAlpha": 1,
          "lineThickness": 2,
          "lineColor": "#0f0",
          "type": "step",
          "valueField": "BidQuantity",
          "balloonFunction": balloon
        },
      ],
      "categoryField": "Rate",
      "chartCursor": {},
      "balloon": {
        "textAlign": "left"
      },
      "valueAxes": [{
        "title": "Quantity"
      }],
      "categoryAxis": {
        "title": "Rate",
        "minHorizontalGap": 100,
        "startOnAxis": true,
        "showFirstLabel": false,
        "showLastLabel": false
      },
      "export": {
        "enabled": false
      }
    };

    let microConfig = {
      "type": "serial",
      "theme": "light",
      "dataProvider": microData,
      "autoMargins": false,
      "marginTop": 0,
      "marginBottom": 0,
      "marginLeft": 0,
      "marginRight": 0,
      "pullOutRadius": 0,
      "borderAlpha": 0.5,
      "borderColor": "#009999",
      "graphs": [
        {
          "id": "asks",
          "fillAlphas": 0.1,
          "lineColor": "#f00",
          "type": "step",
          "valueField": "AskQuantity",
        },
        {
          "id": "bids",
          "fillAlphas": 0.1,
          "lineColor": "#0f0",
          "type": "step",
          "valueField": "BidQuantity",
        },
      ],
      "categoryField": "Rate",
      "valueAxes": [{
        "gridAlpha": 0,
        "axisAlpha": 0,
        "labelsEnabled": false
      }],
      "categoryAxis": {
        "gridAlpha": 0,
        "axisAlpha": 0,
        "labelsEnabled": false
      }
    };


    return (
      <DepthChartView
        rate={this.props.rate}
        dataProvider={dataProvider}
        microData={microData}
        chartConfig={config}
        microChartConfig={microConfig}
        isOpenModal={this.state.isOpenModal}
        toggleModal={toggleModal}
      />

    );
  }
}

export default DepthChart;