import React from 'react';
import { minimizeId } from "../../services/utils/converter"

const PendingActivitiesView = ({ pendingActivities, toggleActionDetail }) => {
	var displayActionName = (actionName) => {
		switch (actionName) {
			case "set_rates":
				return "Set rate"
			case "trade":
				return "Trade"
			case "withdraw":
				return "Withdraw"
			case "deposit":
				return "Deposit"
			default:
				return ""
		}
	}

	return (
		<div>
			<div className="table-responsive">
				<table className="table table-hover ">
					<thead>
						<tr className="text-uppercase">
							<th>Action</th>
							<th>Id</th>
							<th>Exchange Status</th>
							<th>Mining Status</th>
							<th>Destination</th>
						</tr>
					</thead>

					{pendingActivities ? pendingActivities.map((action, k) =>
						<tbody key={k} onClick={toggleActionDetail}>
							<tr >
								<td class="align-middle">{displayActionName(action.Action)}</td>
								<td class="align-middle">{minimizeId(action.ID)}</td>
								<td class="align-middle">{action.ExchangeStatus}</td>
								<td class="align-middle">{action.MiningStatus}</td>
								<td class="align-middle">{action.Destination}</td>
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
	);
}

export default PendingActivitiesView;