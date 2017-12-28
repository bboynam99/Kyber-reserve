import React from 'react';
import TokenBalanceView from "./tokenBalance.view"
import TokenQtyView from "./tokenQty.view"
import TokenRateView from "./tokenRate.view"

import logo from "../../assets/img/dashboard.png"

const TokenInfoView = ({ data, moreInfo, toggleShowMore }) => {
  return (
    <section>
      <div>
        <div className="container py-5">
          <div className="page-title">
            <img src={logo} alt="" />
            <h5 className="title py-2">Kyber Reserve</h5>
          </div>
          <ul className="reserves pt-md-5">
            {Object.keys(data).map((tokenSymbol, i) =>
              <li key={i}>
                <TokenQtyView data={data[tokenSymbol]} />
                <div className="more-info-btn text-right">
                  <button className={moreInfo[tokenSymbol] ? "btn btn-kprimary" : "btn"} onClick={() => toggleShowMore(tokenSymbol)}>
                    MORE INFO
										<i className="fa fa-chevron-right fa-rotate-270"></i>
                  </button>
                </div>
                <TokenRateView data={data[tokenSymbol]} showMore={moreInfo[tokenSymbol]} />
                {moreInfo[tokenSymbol] &&
                  <div>
                    <hr />
                    <TokenBalanceView data={data[tokenSymbol]} />
                  </div>
                }
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TokenInfoView;