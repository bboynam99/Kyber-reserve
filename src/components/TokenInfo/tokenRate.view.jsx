import React from 'react';
import { roundingNumber } from "../../services/utils/conveter"

const TokenRateView = ({ data, showMore}) => {
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
						{data.rates ? data.rates.map((rate, k) =>
							<tbody key={k} className={showMore || k < 1 ? "" : "d-none"}>
								<tr>
									<td>{rate.exchange}</td>
									<td>{rate.symbol}</td>
									<td>{roundingNumber(rate.ask.Quantity * rate.ask.Rate)}</td>
									<td>{roundingNumber(rate.bid.Quantity * rate.bid.Rate)}</td>
								</tr>
							</tbody>
						) : <tbody>
								<tr>
									<td></td>
								</tr>
							</tbody>}
					</table>
				</div>
			</div>
			{/* <div className="col-12 col-md-4 text-right">
				<button className="btn btn-kprimary">
					MORE INFO
										<i className="fa fa-chevron-right fa-rotate-270"></i>
				</button>
			</div> */}
		</div>
	);
}

export default TokenRateView;