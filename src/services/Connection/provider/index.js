import React from 'react';

import HttpProvider from "./httpProvider"
import WsProvider from "./wsProvider"

import BLOCKCHAIN_INFO from "../../../../env"
// import { validURL } from "../../../services/utils/validator"
const httpEndpoint = BLOCKCHAIN_INFO.endpoint.http_endpoint
const wsEndpoint = BLOCKCHAIN_INFO.endpoint.ws_endpoint

export default class BaseProvider extends React.Component {
  constructor(type) {
    super(type)

    this.httpProvider = this.getHttpProvider(httpEndpoint)
    // this.wsProvider = this.getWsProvider(wsEndpoint)
    
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

  getWsProvider(wsUrl) {
    return new WsProvider({ url: wsUrl })
  }

  getHttpProvider(httpUrl) {
    return new HttpProvider({ url: httpUrl })
  }

  setProvider(provider) {
    this.currentProvider = provider
  }

  call(fn) {
    return this.currentProvider[fn].bind(this.currentProvider)
  }

}

