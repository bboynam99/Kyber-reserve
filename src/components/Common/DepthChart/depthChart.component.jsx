import React, { Component } from 'react'
import AmCharts from "@amcharts/amcharts3-react"

import { stretchArray } from "../../../services/utils/conveter"
import { mappingRateForDeptChart } from "../../../services/utils/standardize"

import DepthChartView from "./depthChart.view"

class DepthChart extends Component {

  constructor(props) {
    super(props);
    let dataProvider = mappingRateForDeptChart(props.rate)
    let microData = stretchArray(dataProvider, 3)
    
    this.state = {
      rate: props.rate,
      dataProvider: dataProvider,
      microData: microData,
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

    var config = {
      "type": "serial",
      "theme": "light",
      "dataProvider": this.state.dataProvider,
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

    var microConfig = {
      "type": "serial",
      "theme": "light",
      "dataProvider": this.state.microData,
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
        rate={this.state.rate}
        dataProvider={this.state.dataProvider}
        microData={this.state.microData}
        chartConfig={config}
        microChartConfig={microConfig}
        isOpenModal={this.state.isOpenModal}
        toggleModal={toggleModal}
     />
    );
  }
}

export default DepthChart;