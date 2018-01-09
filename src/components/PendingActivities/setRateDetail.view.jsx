import React from 'react';


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
								<td>{data.Params.buys[i]}</td>
								<td>{data.Params.sells[i]}</td>
							</tr>
						)
					}) : <div />}
				</tbody>
			</table>
		</div>
	);
}

export default SetRateDetailView;