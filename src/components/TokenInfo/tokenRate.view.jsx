import React from 'react';
import { roundingNumber } from "../../services/utils/converter"
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
						{data.kyberRate && data.kyberRate.bid && data.kyberRate.ask ? (
							<tbody>
								<tr>
									<td class="align-middle">{data.kyberRate.exchange.toUpperCase()}</td>
									<td class="align-middle">{data.kyberRate.symbol}</td>
									{data.kyberRate.bid ? <td class="align-middle">{roundingNumber(data.kyberRate.bid.Rate)}</td> : <td />}
									{data.kyberRate.ask ? <td class="align-middle">{roundingNumber(data.kyberRate.ask.Rate)}</td> : <td />}
									<td class="align-middle">
									</td>
								</tr>
							</tbody>
						) : <tbody>
								<tr>
									<td></td>
								</tr>
							</tbody>}


						{data.rates ? data.rates.map((rate, k) =>
							<tbody key={k} className={showMore ? "" : "d-none"}>
								<tr>
									<td class="align-middle">{rate.exchange.toUpperCase()}</td>
									<td class="align-middle">{rate.symbol}</td>
									{rate.bid ? <td class="align-middle">{roundingNumber(rate.bid[0].Rate)}</td> : <td />}
									{rate.ask ? <td class="align-middle">{roundingNumber(rate.ask[0].Rate)}</td> : <td />}
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