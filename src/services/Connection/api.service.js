import Provider from "./provider"
import BLOCKCHAIN_INFO from "../../../env"

// const evaluateEndpoint = process.env.EVALUTATE_ENDPOINT && process.env.EVALUTATE_ENDPOINT != "undefined" ? process.env.EVALUTATE_ENDPOINT :"http://192.168.27.94:9001/"
const evaluateEndpoint = BLOCKCHAIN_INFO.endpoint.evaluate_endpoint

export default class ApiService{
  constructor(){
    this.provider = new Provider('http')
  }
  
  handleNetErr = function(e) {
    console.log(e)
    return e
   };

  getPriceBaseQuotePair(base, quote){
    return this.provider.call("send")('prices/' + base + '/' + quote, "GET", null).catch(this.handleNetErr)
  }

  getAuthData(){
    return this.provider.call("send")("authdata", "GET", null).catch(this.handleNetErr)
  }

  getDashboardData(){
    return this.provider.call("send")("dashboard", "GET", null).catch(this.handleNetErr)
  }

  getPriceAllBaseQuotePair(){
    return this.provider.call("send")("prices", "GET", null).catch(this.handleNetErr)
  }

  getBalanceAllTokenOnBlockChain(){
    return this.provider.call("send")("balances", "GET", null).catch(this.handleNetErr)
  }

  getAllBalanceAllTokenOnSupportedChain(){
    return this.provider.call("send")("ebalances", "GET", null).catch(this.handleNetErr)
  }

  depositExchanges(exchangeId, amount, token){
    let postData = {
      amount, token
    }
    return this.provider.call("send")("deposit/" + exchangeId, "POST", postData).catch(this.handleNetErr)
  }

  withDrawExchanges(exchangeId, amount, token){
    let postData = {
      amount, token
    }
    return this.provider.call("send")("withdraw/" + exchangeId, "POST", postData).catch(this.handleNetErr)
  }

  setRate(sources, dests, rates, expiries){
    let postData = {
      sources, dests, rates, expiries
    }
    return this.provider.call("send")("setrates", "POST", postData).catch(this.handleNetErr)
  }

  trade(exchangeId, base, quote, amount, rate, type){
    let postData = {
      base, quote, amount, rate, type
    }
    return this.provider.call("send")("trade/" + exchangeId, "POST", postData).catch(this.handleNetErr)
  }

  getOpenOrders(){
    return this.provider.call("send")("orders", "GET", null).catch(this.handleNetErr)
  }

  cancelOrder(exchange, base, quote, orderId){
    let postData = {
      base, quote, order_id: orderId
    }
    return this.provider.call("send")("cancelorder/" + exchangeId, "POST", postData).catch(this.handleNetErr)
  }

  getAllKyberRate(){
    return this.provider.call("send")("getrates", "GET", null).catch(this.handleNetErr)
  }

  getAllActivities(timeStamp){
    let path = timeStamp ? "activities?fromTime=" + timeStamp : "activities"
    return this.provider.call("send")(path, "GET", null).catch(this.handleNetErr)
  }

  getEvaluate(){
    return this.provider.call("sendToOtherEndpoint")(evaluateEndpoint + "evaluate", "GET", null).catch(this.handleNetErr)
  }
}