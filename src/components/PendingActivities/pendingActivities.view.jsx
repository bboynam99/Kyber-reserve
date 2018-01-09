import React from "react";

import { minimizeId } from "../../services/utils/converter"

import ReactTable from "react-table";
import "react-table/react-table.css";

import { SetRateDetailView, TradeDetailView, DepositeDetailView, WithdrawDetailView } from "../PendingActivities"

const PendingActivitiesView = ({ pendingActivities }) => {
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

  var SubComponent = (row) => {
    var rowData = row.original

    switch (rowData.Action) {
      case "set_rates":
        return <SetRateDetailView data={rowData} />
      case "trade":
        return <TradeDetailView data={rowData} />
      case "withdraw":
        return <WithdrawDetailView data={rowData} />
      case "deposit":
        return <DepositeDetailView data={rowData} />
      default:
        return <div />
    }
  }

  return (
    <div class="color-black">
      <ReactTable
        data={pendingActivities}
        freezeWhenExpanded={true}
        noDataText={'No pending action'}
        minRows={3}
        defaultPageSize={5}
        className="-striped -highlight"
        SubComponent={SubComponent}
        columns={[
          {
            Header: "First Name",
            id: "Action",
            accessor: d => displayActionName(d.Action)
          },
          {
            Header: "ID",
            id: "ID",
            accessor: d => minimizeId(d.ID)
          },
          {
            Header: "Status",
            columns: [
              {
                Header: "Exchange",
                accessor: "ExchangeStatus"
              },
              {
                Header: "Mining",
                accessor: "MiningStatus"
              }
            ]
          },
          {
            Header: "Destination",
            accessor: "Destination"
          },
          {
            Header: "Expand",
            columns: [
              {
                expander: true,
                Header: () => <strong>More</strong>,
                width: 65,
                Expander: ({ isExpanded, ...rest }) =>
                  <div>
                    {isExpanded
                      ? <span>&#x2299;</span>
                      : <span>&#x2295;</span>}
                  </div>,
                style: {
                  cursor: "pointer",
                  fontSize: 25,
                  padding: "0",
                  textAlign: "center",
                  userSelect: "none"
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}


export default PendingActivitiesView;