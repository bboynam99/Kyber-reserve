import React, { Component } from 'react';
// import ItemHead from './ItemHead';
// import ItemData from './ItemData';
// import ItemBalances from './ItemBalances';
// import * as api from '../../api/getData';
import TokenInfoView from "./tokenInfo.view"

class TokenInfo extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          title: 'KNC',
          percent: 40,
          reserve: {
            current: 6953,
            target: 98563,
          },
          data: [
            { rate: 'Reserve', symbol: 'KNC/ETH', ask: (0.7697399673695822), bid: 0.8697399673695822 },
            { rate: 'Bittrex', symbol: 'KNC/ETH', ask: (0.7697399673695822), bid: 0.8697399673695822 },
            { rate: 'Poloniex', symbol: 'KNC/ETH', ask: (0.7697399673695822), bid: 0.8697399673695822 },
            { rate: 'Binance', symbol: 'KNC/ETH', ask: 0.7697399673695822, bid: 0.8697399673695822 },
            { rate: 'Liqui', symbol: 'KNC/ETH', ask: 0.7697399673695822, bid: 0.8697399673695822 },
          ],
          balances: [
            { rate: 'Bittrex', value: 3000 },
            { rate: 'Poloniex', value: 4790 },
            { rate: 'Binance', value: 5215 },
            { rate: 'Bittfinex', value: 3240 },
            { rate: 'Liqui', value: 6080 },
          ]
        }
      ],
    }
    // this.getData();
  }

  // getData() {
  //   let count = 0;
  //   setInterval(() => {
  //     api.getData(++count).then(data => {
  //       this.setState({
  //         data: data
  //       })
  //     })
  //   }, 2000)
  // }

  render() {
    return (
      <TokenInfoView 
      data={this.state.data}
      />
    );
  }
}

export default TokenInfo;