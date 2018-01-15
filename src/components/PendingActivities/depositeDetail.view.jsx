import React from 'react';


const DepositeDetailView = ({ data }) => {
	return (
		<div class="p-2">
			<strong class="bold">Destination: {data.Destination}</strong>
			<br/>
			<pre>Id: {data.ID}</pre>
			<pre>Amount: {data.Params.amount}</pre>
			<pre>Token: {data.Params.token}</pre>

			<pre>Error: {JSON.stringify(data.Result.error)}</pre>
			<pre>Tx: {data.Result.tx}</pre>
		</div>
	);
}

export default DepositeDetailView;