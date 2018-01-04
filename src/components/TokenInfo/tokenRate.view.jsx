import React from 'react';
import { roundingNumber } from "../../services/utils/conveter"
import { DepthChart } from "../Common"
import { mappingRateForDeptChart } from "../../services/utils/standardize"


const TokenRateView = ({ data, showMore }) => {
	return (
		<div className="row mt-5">
			<div className="col-12 col-md-10">
				<div className=" table-responsive">
					<table className="table">
						<thead>
							<tr className="text-secondary text-uppercase">
								<th>Rate</th>
								<th>Symbol</th>
								<th>BId</th>
								<th>ASk</th>
								<th>Depth</th>
							</tr>
						</thead>
						{data.rates ? data.rates.map((rate, k) =>
							<tbody key={k} className={showMore || k < 1 ? "" : "d-none"}>
								<tr>
									<td class="align-middle">{rate.exchange.toUpperCase()}</td>
									<td class="align-middle">{rate.symbol}</td>
									<td class="align-middle">{roundingNumber(rate.bid[0].Rate)}</td>
									<td class="align-middle">{roundingNumber(rate.ask[0].Rate)}</td>
									<td class="align-middle">
										<DepthChart
											rate={rate}
										/>
									</td>
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