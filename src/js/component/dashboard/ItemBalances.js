import React, { Component } from 'react';

class ItemBalances extends Component {
    render() {
        return (
            <div className="pt-3">
                <div className="h4 font-weight-sbold">
                    <i className="fa fa-bar-chart"></i> Balances
                                    </div>
                <div className="row">
                    <div className="col-4 col-sm-3 col-md">
                        <div className="text-uppercase text-secondary my-3">BITTREX</div>
                        <div className="h6 font-weight-sbold">3000</div>
                    </div>
                    <div className="col-4 col-sm-3 col-md">
                        <div className="text-uppercase text-secondary my-3">Poloniex</div>
                        <div className="h6 font-weight-sbold">4790</div>
                    </div>
                    <div className="col-4 col-sm-3 col-md">
                        <div className="text-uppercase text-secondary my-3">Binance</div>
                        <div className="h6 font-weight-sbold">5215</div>
                    </div>
                    <div className="col-4 col-sm-3 col-md">
                        <div className="text-uppercase text-secondary my-3">Bittfinex</div>
                        <div className="h6 font-weight-sbold">3240</div>
                    </div>
                    <div className="col-4 col-sm-3 col-md">
                        <div className="text-uppercase text-secondary my-3">Liqui</div>
                        <div className="h6 font-weight-sbold">6080</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemBalances;
