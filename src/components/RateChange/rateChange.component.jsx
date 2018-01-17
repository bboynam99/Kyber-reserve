import React, { Component } from 'react'
import { connect } from "react-redux"

import RateChangeView from "./rateChange.view"

import RatesService from "../../services/rates"

import { poll } from "../../services/utils/standardize"

@connect((store) => {
  const apiService = store.global.apiService
  return { apiService }
})


export default class RateChange extends Component {
  constructor() {
    super();
    this.ratesService = new RatesService()
    this.intervalUpdateRate
    this.currentTimeStamp
    this.state = {
      data: {},
      selected: "KNC"
    }
  }

  componentDidMount(){
    this.ratesService.syncAllRates(this.props.apiService).then(data => {
      this.currentTimeStamp = data.currentTimeStamp
      this.setState({
        data: data.data
      })
    })
    this.intervalUpdateRate = setInterval(this.updateRate, 30000)
  }

  componentWillUnmount(){
    clearInterval(this.intervalUpdateRate)
  }


  updateRate = () => {
    this.ratesService.syncAllRates(this.props.apiService, this.currentTimeStamp).then(data => {
      if(!data.data) return 

      this.currentTimeStamp= data.currentTimeStamp
      let newData = {}
      Object.keys(data.data).map( tokenSymbol => {
        let newLength = data.data[tokenSymbol].length
        let updatedObjdata = [ ...data.data[tokenSymbol], ...this.state.data[tokenSymbol]]
        updatedObjdata.splice(-newLength)
        newData[tokenSymbol] = updatedObjdata
      })

      this.setState({
        data: newData
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
