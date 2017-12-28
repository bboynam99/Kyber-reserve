import React, { Component } from 'react';
import { connect } from "react-redux"
// import ItemHead from './ItemHead';
// import ItemData from './ItemData';
// import ItemBalances from './ItemBalances';
// import * as api from '../../api/getData';
import TokenInfoView from "./tokenInfo.view"
import ApiService from "../../services/Connection/api.service"
import TokensService from "../../services/tokens"

import ReactDOM from "react-dom"

import BigNumber from 'bignumber.js'

@connect((store) => {
  const apiService = store.global.apiService
  return { apiService }
})


class TokenInfo extends Component {
  constructor() {
    super();
    this.tokensService = new TokensService()
    this.state = {
      data: {},
      abc: true
    }
    
  }
  // componentDidUpdate(){
  //   console.log("+++++++++++++++++++++++++++++++++")
  //   var thisHtml = ReactDOM.findDOMNode(this);
  //   console.log(thisHtml)
  // }
  componentDidMount(){
    this.tokensService.syncAll(this.props.apiService).then((tokens) => {
      this.setState({data: tokens})
    })  

    // console.log(new BigNumber('827198371982.17298371293791827398217').toFormat(2))
  }

  render(){
    let renderView = <TokenInfoView 
                      data={this.state.data}
                      />
    console.log("*&&&&&&&&&&&&&&&&&&&*&*&*&*")
    console.log(renderView)
    return renderView
  }
}

export default TokenInfo;