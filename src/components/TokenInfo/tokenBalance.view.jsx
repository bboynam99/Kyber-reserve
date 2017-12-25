import React from 'react';

const TokenBalanceView = ({ data }) => {
  return (
    <div className="pt-3">
      <div className="h4 font-weight-sbold">
        <i className="fa fa-bar-chart"></i> Balances
                                    </div>
      <div className="row">
        {data.balances ? data.balances.map((exchangeBalance, i) =>
          <div className="col-4 col-sm-3 col-md" key={i}>
            <div className="text-uppercase text-secondary my-3">{exchangeBalance.exchange}</div>
            <div className="h6 font-weight-sbold">{exchangeBalance.value}</div>
          </div>
        ) : <div></div>}
      </div>
    </div>
  );
}

export default TokenBalanceView;