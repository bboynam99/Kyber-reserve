import React, { Component } from 'react';
import { connect } from "react-redux"
import SignView from './sign.view'
import { setSecretKey } from "../../actions/globalActions"
@connect((store) => {
  const apiService = store.global.apiService
  return { apiService }
})

export default class Sign extends Component {
  constructor() {
    super()
    this.state = {
      keyString: "",
      isSubmited: false
    }
  }

  onSubmit(){
    this.setState({
      isSubmited: true
    });
    this.props.dispatch(setSecretKey(this.state.keyString))
  }
  onChange(evt){
    this.setState({
      keyString: evt.target.value
    });
  }
  onClear(){
    location.href = '/'
  }

  render() {
    return (
      <SignView 
      isSubmited={this.state.isSubmited}
      onSubmit={this.onSubmit.bind(this)}
      onChange={this.onChange.bind(this)}
      keyString={this.state.keyString}
      onClear={this.onClear.bind(this)}
      />
    );
  }
}