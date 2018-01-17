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
    let d = new Date()
    d.setDate(d.getDate()-1);
    this.currentTimeStamp = d.getTime()
    this.state = {
      data: {},
      selected: "KNC"
    }
  }

  componentDidMount(){
    this.ratesService.syncAllRates(this.props.apiService, this.currentTimeStamp).then(data => {
      if(!data.currentTimeStamp || data.currentTimeStamp <= this.currentTimeStamp) return
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

      if(!data.currentTimeStamp || data.currentTimeStamp <= this.currentTimeStamp) return
      this.currentTimeStamp = data.currentTimeStamp
      let newData = {}
      Object.keys(data.data).map( tokenSymbol => {
        let newLength = data.data[tokenSymbol].length
        let updatedObjdata = [ ...this.state.data[tokenSymbol], ...data.data[tokenSymbol]]
        if(this.state.data[tokenSymbol] && this.state.data[tokenSymbol].length > 100) updatedObjdata.splice(0, newLength)
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
