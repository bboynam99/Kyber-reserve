import React, { Component } from 'react'
import AmCharts from "@amcharts/amcharts3-react"
import { stretchArray } from "../../../services/utils/conveter"
import { KModal } from "../../Common"

import { mappingRateForDeptChart } from "../../../services/utils/standardize"

function balloon(item, graph) {
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
    let mappedData = mappingRateForDeptChart(props.rate)
    console.log(props.rate)
    this.state = {
      rate: props.rate,
      dataProvider: mappedData,
      microData: stretchArray(mappedData, 3),

      isOpenModal: false
    };
  }

  toggleModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal })
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

    var modalContent = (
      <div>
        {this.state.dataProvider && this.state.dataProvider.length ? <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} /> : <div />}
        <div class="row">
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rate.bid ? this.state.rate.bid.map((bidItem, i) => (
                  <tr key={i}>
                    <td>{bidItem.Quantity}</td>
                    <td>{bidItem.Rate}</td>
                  </tr>
                )) : <tr/>}
              </tbody>
            </table>
          </div>
          <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rate.ask ? this.state.rate.ask.map((askItem, i) => (
                 <tr key={i}>
                  <td>{askItem.Quantity}</td>
                  <td>{askItem.Rate}</td>
                </tr>
              )) : <tr/>}
            </tbody>
          </table>
          </div>  
        </div>
      </div>
    )

    return (
      <div onClick={this.toggleModal}>
        <KModal
          className={{
            base: 'reveal tiny',
            afterOpen: 'reveal tiny'
          }}
          isOpen={this.state.isOpenModal}
          contentLabel="error modal"
          content={modalContent}
        // onRequestClose={props.onRequestClose}
        />

        {this.state.dataProvider && this.state.dataProvider.length ? <AmCharts.React style={{ width: "200px", height: "120px" }} options={microConfig} /> : <div />}
      </div>
    );
  }
}

export default DepthChart;