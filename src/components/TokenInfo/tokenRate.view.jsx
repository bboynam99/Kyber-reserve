import React from 'react';

const TokenRateView = ({ data }) => {
  return (
    <div className="row mt-5">
      <div className="col-12 col-md-8">
        <div className=" table-responsive">
          <table className="table">
            {/* <thead> */}
              <tr className="text-secondary text-uppercase">
                <th>Rate</th>
                <th>Symbol</th>
                <th>ASk</th>
                <th>BId</th>
              </tr>
            {/* </thead> */}
            {data.rates && data.rates.forEach((rate, k) =>
            
              <tr>
                <td>andn</td>
              </tr>
              // (<tr key={k}>
              //   <td>{rate.rate}</td>
              //   <td>{rate.symbol}</td>
              //   <td>{rate.ask}</td>
              //   <td>{rate.bid}</td>
              // </tr>)
            )}
          </table>
        </div>
      </div>
      <div className="col-12 col-md-4 text-right">
        <button className="btn btn-kprimary">
          MORE INFO
                    <i className="fa fa-chevron-right fa-rotate-270"></i>
        </button>
      </div>
    </div>
  );
}

export default TokenRateView;