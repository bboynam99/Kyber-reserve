import React from 'react';
import { KModal } from "../../Common"

const DepthChartView = ({ rate, dataProvider, microData, chartConfig, microChartConfig, isOpenModal, toggleModal }) => {
  var modalContent = (
    <div>
      {dataProvider && dataProvider.length ? <AmCharts.React style={{ width: "100%", height: "500px" }} options={chartConfig} /> : <div />}
      <div class="row">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {rate.bid ? rate.bid.map((bidItem, i) => (
                <tr key={i}>
                  <td>{bidItem.Quantity}</td>
                  <td>{bidItem.Rate}</td>
                </tr>
              )) : <tr/>}
            </tbody>
          </table>
        </div>
        <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {rate.ask ? rate.ask.map((askItem, i) => (
               <tr key={i}>
                <td>{askItem.Quantity}</td>
                <td>{askItem.Rate}</td>
              </tr>
            )) : <tr/>}
          </tbody>
        </table>
        </div>  
      </div>
    </div>
  )

  return (
    <div onClick={toggleModal}>
        <KModal
          className={{
            base: 'reveal tiny',
            afterOpen: 'reveal tiny'
          }}
          isOpen={isOpenModal}
          contentLabel="error modal"
          content={modalContent}
        // onRequestClose={props.onRequestClose}
        />

        {dataProvider && dataProvider.length ? <AmCharts.React style={{ width: "200px", height: "120px" }} options={microChartConfig} /> : <div />}
      </div>
  );
}

export default DepthChartView;