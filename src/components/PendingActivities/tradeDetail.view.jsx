import React from 'react';


const TradeDetailView = ({ data }) => {
	return (
		<div class="p-2">
			<strong class="bold">Destination: {data.Destination}</strong>
			<br/>
			<pre>Amount: {data.Params.amount}</pre>
			<pre>Base: {data.Params.base}</pre>
			<pre>Quote: {data.Params.quote}</pre>
			<pre>Exchange: {data.Params.exchange}</pre>
			<pre>Rate: {data.Params.rate}</pre>
			<pre>Type: {data.Params.type}</pre>

			<pre>Result: { data.Result.done ? "done" : "fail"}</pre>
			<pre>Error: { data.Result.error }</pre>
		</div>
	);
}

export default TradeDetailView;