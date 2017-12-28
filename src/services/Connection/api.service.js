import Provider from "./provider"

export default class ApiService{
  constructor(){
    this.provider = new Provider('http')
  }

  getPriceBaseQuotePair(base, quote){
    return this.provider.send('prices/' + base + '/' + quote, "GET", null)
  }

  getAuthData(){
    return this.provider.send("authdata", "GET", null)
  }

  getDashboardData(){
    return this.provider.send("dashboard", "GET", null)
  }

  getPriceAllBaseQuotePair(){
    return this.provider.send("prices", "GET", null)
  }

  getBalanceAllTokenOnBlockChain(){
    return this.provider.send("balances", "GET", null)
  }

  getAllBalanceAllTokenOnSupportedChain(){
    return this.provider.send("ebalances", "GET", null)
  }

  depositExchanges(exchangeId, amount, token){
    let postData = {
      amount, token
    }
    return this.provider.send("deposit/" + exchangeId, "POST", postData)
  }

  withDrawExchanges(exchangeId, amount, token){
    let postData = {
      amount, token
    }
    return this.provider.send("withdraw/" + exchangeId, "POST", postData)
  }

  setRate(sources, dests, rates, expiries){
    let postData = {
      sources, dests, rates, expiries
    }
    return this.provider.send("setrates", "POST", postData)
  }

  trade(exchangeId, base, quote, amount, rate, type){
    let postData = {
      base, quote, amount, rate, type
    }
    return this.provider.send("trade/" + exchangeId, "POST", postData)
  }

  getOpenOrders(){
    return this.provider.send("orders", "GET", null)
  }

  cancelOrder(exchange, base, quote, orderId){
    let postData = {
      base, quote, order_id: orderId
    }
    return this.provider.send("cancelorder/" + exchangeId, "POST", postData)
  }
}