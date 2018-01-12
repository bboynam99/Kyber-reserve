import React from 'react';
import { KModal } from "../../Common"

const DepthChartView = ({ rate, dataProvider, microData, chartConfig, microChartConfig, isOpenModal, toggleModal }) => {
  var modalContent = (
    <div class="depth-chart">
      <div class="px-5">
        {dataProvider && dataProvider.length ? <AmCharts.React style={{ width: "100%", height: "500px" }} options={chartConfig} /> : <div />}
      </div>
      <div class="col-8 mx-auto ">
        <div class="row">
          <div class="col">
          <h4 class="mx-auto text-center">Bids</h4>
            <table class="table table-fixed">
              <thead>
                <tr>
                  <th class="col-6">Quantity</th>
                  <th class="col-6">Rate</th>
                </tr>
              </thead>
              <tbody>
                {rate.bid ? rate.bid.map((bidItem, i) => (
                  <tr key={i}>
                    <td class="col-6">{bidItem.Quantity}</td>
                    <td class="col-6">{bidItem.Rate}</td>
                  </tr>
                )) : <tr />}
              </tbody>
            </table>


          </div>
          <div class="col">
            <h4 class="mx-auto text-center">Asks</h4>
            <table class="table table-fixed">
              <thead>
                <tr>
                  <th class="col-6">Rate</th>
                  <th class="col-6">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {rate.ask ? rate.ask.map((askItem, i) => (
                  <tr key={i}>
                    <td class="col-6">{askItem.Rate}</td>
                    <td class="col-6">{askItem.Quantity}</td>
                  </tr>
                )) : <tr />}
              </tbody>
            </table>
          </div>
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

      {dataProvider && dataProvider.length ? <AmCharts.React style={{ width: "110px", height: "60px" }} options={microChartConfig} /> : <div />}
    </div>
  );
}

export default DepthChartView;