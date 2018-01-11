import React from 'react';

import BLOCKCHAIN_INFO from "../../../env"
import { roundingNumber } from "../../services/utils/converter"

import IMAGE_ICON from "../../assets/img"
import { BigNumber } from "bignumber.js";

const TokenQtyView = ({data, totalAllQty}) => {
  let percent = 0

  if(totalAllQty && totalAllQty !== '0'){
    let bigEthValue = new BigNumber(data.estimateEthValue.toString())
    let bigTotalAll = new BigNumber(totalAllQty)
    percent = bigEthValue.div(bigTotalAll).times(100).round(2).toString()
  }
    


  return (
    <div>
      <div className="logo">
        <img src={IMAGE_ICON[data.info.symbol]} alt="" />
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
            <span className="mr-auto" title={data.reserveBalance}>{roundingNumber(data.reserveBalance)}</span>
            <small title={data.reserveTarget}>/ {roundingNumber(data.reserveTarget)}</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="label">
            <span className="mr-auto">current total qty</span>
            <span className="text-secondary">target</span>
          </div>
          <div className="value">
            <span className="mr-auto" title={data.totalQty}>{roundingNumber(data.totalQty)}</span>
            <small title={data.totalTarget}>/ {roundingNumber(data.totalTarget)}</small>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="label">&nbsp;</div>
          <div className="value value-progress">{percent}%</div>
          <div className="progress">
            <div className="progress-bar bg-knc" style={{ width: percent + "%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenQtyView;