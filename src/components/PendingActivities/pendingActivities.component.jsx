import React, { Component } from 'react'

import PendingActivitiesView from "./pendingActivities.view"

export default class PendingActivities extends Component {
  constructor() {
    super();
  }

  toggleActionDetail = () => {
    console.log("_________________________")
  }

  render() {
    return (
      <PendingActivitiesView 
        pendingActivities={this.props.pendingActivities}
        toggleActionDetail={this.toggleActionDetail}
      />
    );
  }
}
