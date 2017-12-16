import React from 'react';
import TokenBalanceView from "./tokenBalance.view"
import TokenQtyView from "./tokenQty.view"
import TokenRateView from "./tokenRate.view"

const TokenInfoView = ({data}) => {
  return (
    <section>
      <div>
        <div className="container py-5">
          <div className="page-title">
            <img src="/img/dashboard.png" alt="" />
            <h5 className="title py-2">Kyber Reserve</h5>
          </div>

          <ul className="reserves pt-md-5">
            {data.map((item, i) =>
              <li key={i}>
                <TokenQtyView data={item} />
                <TokenRateView data={item} />
                <hr />
                <TokenBalanceView data={item} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TokenInfoView;