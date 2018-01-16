import React, { Component } from 'react'
import { connect } from "react-redux"

import RateChangeView from "./rateChange.view"

import RatesService from "../../services/rates"

@connect((store) => {
  const apiService = store.global.apiService
  return { apiService }
})


export default class RateChange extends Component {
  constructor() {
    super();
    this.ratesService = new RatesService()
    this.state = {
      data: {},
      selected: "KNC"
    }
  }

  componentDidMount(){
    this.ratesService.syncAllRates(this.props.apiService).then(data => {
      this.setState({
        data: data
      })
    })
  }

  selectChange(event){
    this.setState({
      selected: event.target.value
    })
  }

  render() {
    return (
      <RateChangeView
        data={this.state.data}
        selected={this.state.selected}
        selectChange={this.selectChange.bind(this)}
      />
    );
  }
}
