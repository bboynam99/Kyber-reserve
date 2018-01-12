import React from 'react';

import HttpProvider from "./httpProvider"
import WsProvider from "./wsProvider"


const httpEndpoint = "http://52.77.19.90:8000/"
const wsEndpoint = "ws://52.77.19.90:8000/"


export default class BaseProvider extends React.Component {
  constructor(type) {
    super(type)

    this.httpProvider = this.getHttpProvider()
    this.wsProvider = this.getWsProvider()

    this.initProvider(type)
  }

  initProvider(type) {
    switch (type) {
      case "http":
        this.currentProvider = this.httpProvider
        this.providerLabel = "http"
        break
      case "ws":
        this.currentProvider = this.wsProvider
        this.providerLabel = "ws"
        break
      default:
        this.currentProvider = this.httpProvider
        this.providerLabel = "http"
        break
    }
  }

  getWsProvider() {
    return new WsProvider({ url: wsEndpoint })
  }

  getHttpProvider() {
    return new HttpProvider({ url: httpEndpoint })
  }

  setProvider(provider) {
    this.currentProvider = provider
  }

  call(fn) {
    return this.currentProvider[fn].bind(this.currentProvider)
  }

}

