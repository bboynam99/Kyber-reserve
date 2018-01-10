import Provider from "./bprovider"

export default class ApiService{
  constructor(){
    this.provider = new Provider('http')
  }

  getPriceBaseQuotePair(base, quote){
    return this.provider.call("send")('prices/' + base + '/' + quote, "GET", null)
  }

  getAuthData(){
    return this.provider.call("send")("authdata", "GET", null)
  }

  getDashboardData(){
    return this.provider.call("send")("dashboard", "GET", null)
  }

  getPriceAllBaseQuotePair(){
    return this.provider.call("send")("prices", "GET", null)
  }

  getBalanceAllTokenOnBlockChain(){
    return this.provider.call("send")("balances", "GET", null)
  }

  getAllBalanceAllTokenOnSupportedChain(){
    return this.provider.call("send")("ebalances", "GET", null)
  }

  depositExchanges(exchangeId, amount, token){
    let postData = {
      amount, token
    }
    return this.provider.call("send")("deposit/" + exchangeId, "POST", postData)
  }

  withDrawExchanges(exchangeId, amount, token){
    let postData = {
      amount, token
    }
    return this.provider.call("send")("withdraw/" + exchangeId, "POST", postData)
  }

  setRate(sources, dests, rates, expiries){
    let postData = {
      sources, dests, rates, expiries
    }
    return this.provider.call("send")("setrates", "POST", postData)
  }

  trade(exchangeId, base, quote, amount, rate, type){
    let postData = {
      base, quote, amount, rate, type
    }
    return this.provider.call("send")("trade/" + exchangeId, "POST", postData)
  }

  getOpenOrders(){
    return this.provider.call("send")("orders", "GET", null)
  }

  cancelOrder(exchange, base, quote, orderId){
    let postData = {
      base, quote, order_id: orderId
    }
    return this.provider.call("send")("cancelorder/" + exchangeId, "POST", postData)
  }
}