import React from 'react';

import logo from "../../assets/img/dashboard.png"
import IMAGE_ICON from "../../assets/img"

import { LineChart } from "../Common"

const RateChangeView = ({ data, selected, selectChange }) => {
  console.log(data)
  return (
    <section>
      <div>
        <div class="container py-5">
          <div class="page-title">
            <img src="img/dashboard.png" alt="" />
            <h5 class="title py-2">Rate Change</h5>
          </div>
          <ul class="reserves pt-md-5">
            <li>
              <div class="logo">
                <img src={IMAGE_ICON[selected]} alt="" />
              </div>
              <div class="setting">
                <span>settings</span>
                <i class="fa fa-cog"></i>
              </div>
              <div class="row">
                <div class="col-6 col-md-2">
                  <div class="label">TOKEN</div>
                  <select value={selected} onChange={selectChange}>
                    {data ? Object.keys(data).map( (tokenSymbol, i) => (
                      <option key={i} value={tokenSymbol} >{tokenSymbol}</option>
                    )) : <div/>} 
                  </select>
                </div>
              </div>
              <div class="row mt-5">
                <LineChart 
                  data={data[selected]}
                />
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RateChangeView;