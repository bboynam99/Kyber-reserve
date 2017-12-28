import React from 'react';
import { roundingNumber } from "../../services/utils/conveter"

const TokenBalanceView = ({ data }) => {
  return (
    <div className="pt-3">
      <div className="h4 font-weight-sbold">
        <i className="fa fa-bar-chart"></i> Balances
                                    </div>
      <div className="row">
        {data.exchangeBalance ? Object.keys(data.exchangeBalance).map((exchangeName, i) =>
          <div className="col-4 col-sm-3 col-md" key={i}>
            <div className="text-uppercase text-secondary my-3">{exchangeName}</div>
            <div className="h6 font-weight-sbold">{roundingNumber(data.exchangeBalance[exchangeName].AvailableBalance + data.exchangeBalance[exchangeName].DepositBalance + data.exchangeBalance[exchangeName].LockedBalance)}</div>
          </div>
        ) : <div></div>}
      </div>
    </div>
  );
}

export default TokenBalanceView;