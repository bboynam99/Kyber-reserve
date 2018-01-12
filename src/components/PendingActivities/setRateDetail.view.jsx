import React from 'react';

import { toT } from "../../services/utils/converter"
import CONSTANTS from "../../services/constants"

const SetRateDetailView = ({ data }) => {
	return (
		<div class="p-2">
			<strong class="bold">Block: {data.Params.block}</strong>
			<br/>
			<table class="table table-sm table-bordered table-hover">
				<thead>
					<tr>
						<th>Token</th>
						<th>Buy</th>
						<th>Sell</th>
					</tr>
				</thead>
				<tbody>
					{data.Params && data.Params.tokens.length && data.Params.buys.length &&  data.Params.sells.length ? 
					data.Params.tokens.map((token, i) => {
						return (
							<tr key={i}>
								<td>{token}</td>
								<td>{toT(data.Params.buys[i], CONSTANTS.SUPPORTED_TOKENS[token].decimal, 5)}</td>
								<td>{toT(data.Params.sells[i], CONSTANTS.SUPPORTED_TOKENS.ETH.decimal, 5)}</td>
							</tr>
						)
					}) : <div />}
				</tbody>
			</table>
		</div>
	);
}

export default SetRateDetailView;