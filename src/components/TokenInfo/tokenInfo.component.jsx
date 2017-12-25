import React, { Component } from 'react';
import { connect } from "react-redux"
// import ItemHead from './ItemHead';
// import ItemData from './ItemData';
// import ItemBalances from './ItemBalances';
// import * as api from '../../api/getData';
import TokenInfoView from "./tokenInfo.view"
import ApiService from "../../services/Connection/api.service"
import TokensService from "../../services/tokens"

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

  componentDidMount(){
    this.tokensService.syncAll(this.props.apiService).then((tokens) => {
      this.setState({data: tokens})
    })    
  }

  async getPriceAllBaseQuotePair(){
    try{
      let allPrice = await this.props.apiService.getPriceAllBaseQuotePair()
      console.log("+++++++++++++++______________")
      console.log(allPrice)
    } catch (e){
      console.log(e)
    }
    
  }

  render() {
    return (
      <TokenInfoView 
      data={this.state.data}
      />
    );
  }
}

export default TokenInfo;