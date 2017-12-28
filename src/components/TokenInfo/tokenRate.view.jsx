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
								<th className="w-25">Rate</th>
								<th className="w-25">Symbol</th>
								<th className="w-25">ASk</th>
								<th className="w-25">BId</th>
							</tr>
						</thead>
						{data.rates ? data.rates.map((rate, k) =>
							<tbody key={k} className={showMore || k < 1 ? "" : "d-none"}>
								<tr>
									<td>{rate.exchange}</td>
									<td>{rate.symbol}</td>
									<td title={rate.ask.Quantity * rate.ask.Rate}>{roundingNumber(rate.ask.Quantity * rate.ask.Rate)}</td>
									<td title={rate.bid.Quantity * rate.bid.Rate}>{roundingNumber(rate.bid.Quantity * rate.bid.Rate)}</td>
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