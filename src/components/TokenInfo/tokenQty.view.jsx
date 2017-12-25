import React from 'react';

import BLOCKCHAIN_INFO from "../../../env"

const TokenQtyView = ({data}) => {
  return (
    <div>
      <div className="logo">
        <img src={require("../../assets/img/knc.png")} alt="" />
      </div>
      <div className="setting">
        <span>settings</span>
        <i className="fa fa-cog"></i>
      </div>
      <div className="row">
        <div className="col-6 col-md-2">
          <div className="label">TOKEN</div>
          <div className="value">{data.info.symbol}</div>
        </div>
        <div className="col-6 col-md-3">
          <div className="label">
            <span className="mr-auto">current reserve qty</span>
            <span className="text-secondary">target</span>
          </div>
          <div className="value">
            <span className="mr-auto">{data.qty.current}</span>
            <small>/ {data.qty.target}</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="label">
            <span className="mr-auto">current reserve qty</span>
            <span className="text-secondary">target</span>
          </div>
          <div className="value">
            <span className="mr-auto">{data.qty.current}</span>
            <small>/ {data.qty.target}</small>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="label">&nbsp;</div>
          <div className="value value-progress">{data.percent}%</div>
          <div className="progress">
            <div className="progress-bar bg-knc" style={{ width: data.percent + "%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenQtyView;