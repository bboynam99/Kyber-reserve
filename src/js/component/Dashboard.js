import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <section>
                <div>
                    <div className="container py-5">
                        <div className="page-title">
                            <img src="assets/img/dashboard.png" alt="" />
                            <h5 className="title py-2">Kyber Reserve</h5>
                        </div>
                        <ul className="reserves pt-md-5">
                            <li>
                                <div className="logo">
                                    <img src="assets/img/knc.png" alt="" />
                                </div>
                                <div className="setting">
                                    <span>settings</span>
                                    <i className="fa fa-cog"></i>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-md-2">
                                        <div className="label">TOKEN</div>
                                        <div className="value">KNC</div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="label">
                                            <span className="mr-auto">current reserve qty</span>
                                            <span className="text-secondary">target</span>
                                        </div>
                                        <div className="value">
                                            <span className="mr-auto">6953</span>
                                            <small>/ 98563</small>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="label">
                                            <span className="mr-auto">current reserve qty</span>
                                            <span className="text-secondary">target</span>
                                        </div>
                                        <div className="value">
                                            <span className="mr-auto">6953</span>
                                            <small>/ 98563</small>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <div className="label">&nbsp;</div>
                                        <div className="value value-progress">40%</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-knc" style={{width: "40%"}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-12 col-md-8">
                                        <div className=" table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr className="text-secondary text-uppercase">
                                                        <th>Rate</th>
                                                        <th>Symbol</th>
                                                        <th>ASk</th>
                                                        <th>BId</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Reserve</td>
                                                        <td>KNC/ETH</td>
                                                        <td>0.7697399673695822</td>
                                                        <td>0.8697399673695822</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bittrex</td>
                                                        <td>KNC/ETH</td>
                                                        <td>0.7697399673695822</td>
                                                        <td>0.8697399673695822</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Poloniex</td>
                                                        <td>KNC/ETH</td>
                                                        <td>0.7697399673695822</td>
                                                        <td>0.8697399673695822</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Binance</td>
                                                        <td>KNC/ETH</td>
                                                        <td>0.7697399673695822</td>
                                                        <td>0.8697399673695822</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Liqui</td>
                                                        <td>KNC/ETH</td>
                                                        <td>0.7697399673695822</td>
                                                        <td>0.8697399673695822</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 text-right">
                                        <button className="btn btn-kprimary btn-active">
                                            MORE INFO
                                    <i className="fa fa-chevron-right fa-rotate-270"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr />
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
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;
