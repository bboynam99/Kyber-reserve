import React, { Component } from 'react'
import AmCharts from "@amcharts/amcharts3-react"

function balloon(item, graph) {
  var txt;
  if (graph.id == "asks") {
    txt = "Ask: <strong>" + formatNumber(item.dataContext.Rate, graph.chart, 4) + "</strong><br />"
      + "Quantity: <strong>" + formatNumber(item.dataContext.AskQuantity, graph.chart, 2) + "</strong>";
  }
  else {
    txt = "Bid: <strong>" + formatNumber(item.dataContext.Rate, graph.chart, 4) + "</strong><br />"
      + "Quantity: <strong>" + formatNumber(item.dataContext.BidQuantity, graph.chart, 2) + "</strong>";
  }
  return txt;
}

function formatNumber(val, chart, precision) {
  return AmCharts.formatNumber(
    val, 
    {
      precision: precision ? precision : chart.precision, 
      decimalSeparator: chart.decimalSeparator,
      thousandsSeparator: chart.thousandsSeparator
    }
  );
}

class DepthChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProvider: props.dataProvider
    };
  }

  render() {
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


    return (
      <div className="App">
        <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
      </div>
    );
  }
}

export default DepthChart;