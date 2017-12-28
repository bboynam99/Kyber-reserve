import React, { Component } from 'react';
import { connect } from "react-redux"
import TokenInfoView from "./tokenInfo.view"
import ApiService from "../../services/Connection/api.service"
import TokensService from "../../services/tokens"

// import ReactDOM from "react-dom"

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
      moreInfo: {}
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
  }

  toggleShowMore = (tokenSymbol) => {
    this.setState((prevState, props) => {
      prevState.moreInfo[tokenSymbol] = !prevState.moreInfo[tokenSymbol]
      return {
        moreInfo: {...prevState.moreInfo}
      }
    })
  }

  render(){
    let renderView = <TokenInfoView 
                      data={this.state.data}
                      moreInfo={this.state.moreInfo}
                      toggleShowMore={this.toggleShowMore}
                      />
    return renderView
  }
}

export default TokenInfo;