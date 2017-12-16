import React from 'react';

const TokenRateView = ({data}) => {
  return (
    <div className="row mt-5">
      <div className="col-12 col-md-8">
        <div className=" table-responsive">
          <table className="table">
            <thead>
              <tr className="text-secondary text-uppercase">
                <th>Rate</th>
                <th>Symbol</th>
                <th>ASk</th>
                <th>BId</th>
              </tr>
            </thead>
            <tbody>
              {
                data.data.map((data, i) =>
                  <tr key={i}>
                    <td>{data.rate}</td>
                    <td>{data.symbol}</td>
                    <td>{data.ask}</td>
                    <td>{data.bid}</td>
                  </tr>
                )
              }
            </tbody>
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