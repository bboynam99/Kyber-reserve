import Provider from "./provider"

export default class ApiService{
  constructor(){
    this.provider = new Provider('http')
  }

  getPriceBaseQuotePair(base, quote){
    return this.provider.send('prices/' + base + '/' + quote, "GET", null)
  }

  getPriceAllBaseQuotePair(){
    // return this.provider.send("prices", "GET", null)
     return Promise.resolve(
      {
        "data": {
          "ADX-ETH": {
            "bittrex": {
              "Valid": true,
              "Error": "",
              "Timestamp": "1513927707890",
              "Bids": [
                {
                  "Quantity": 7115.955,
                  "Rate": 0.00227828
                },
                {
                  "Quantity": 531.67261147,
                  "Rate": 0.00227827
                },
                {
                  "Quantity": 753.49600631,
                  "Rate": 0.0022782
                }
            
              ],
              "Asks": [
                {
                  "Quantity": 147.05454649,
                  "Rate": 0.00241495
                },
                {
                  "Quantity": 132.3575165,
                  "Rate": 0.00243398
                },
                {
                  "Quantity": 280.61114483,
                  "Rate": 0.00249483
                }
              ],
              "ReturnTime": "1513927707909"
            }
          },
          "BAT-ETH": {
            "bittrex": {
              "Valid": true,
              "Error": "",
              "Timestamp": "1513927707890",
              "Bids": [
                {
                  "Quantity": 2961.99607852,
                  "Rate": 0.00041513
                },
                {
                  "Quantity": 7699.23,
                  "Rate": 0.00041272
                },
                {
                  "Quantity": 346.01710644,
                  "Rate": 0.00041271
                },
                {
                  "Quantity": 49.50048045,
                  "Rate": 0.0004127
                }
              
              ],
              "Asks": [
                {
                  "Quantity": 7434.812,
                  "Rate": 0.00042607
                },
                {
                  "Quantity": 136264.87307098,
                  "Rate": 0.00042608
                },
                {
                  "Quantity": 177.3750184,
                  "Rate": 0.00042609
                }
              ],
              "ReturnTime": "1513927707907"
            }
          }
        },
        "success": true,
        "timestamp": "1513927710456",
        "version": 4375
      }
    )
  }

  getBalanceAllTokenOnBlockChain(){
    // return this.provider.send("balances", "GET", null)
    return Promise.resolve(
      {
        "data": {
          "ADX": {
            "Valid": true,
            "Error": "",
            "Timestamp": "1513930875894",
            "ReturnTime": "1513930876264",
            "Balance": 12
          },
          "BAT": {
            "Valid": true,
            "Error": "",
            "Timestamp": "1513930875894",
            "ReturnTime": "1513930876264",
            "Balance": 34
          },
          "CVC": {
            "Valid": true,
            "Error": "",
            "Timestamp": "1513930875894",
            "ReturnTime": "1513930876264",
            "Balance": 2
          },
          "DGD": {
            "Valid": true,
            "Error": "",
            "Timestamp": "1513930875894",
            "ReturnTime": "1513930876264",
            "Balance": 324
          },
          "EOS": {
            "Valid": true,
            "Error": "",
            "Timestamp": "1513930875894",
            "ReturnTime": "1513930876264",
            "Balance": 0
          }
        },
        "success": true,
        "timestamp": "1513930877471",
        "version": 8285
      }
    )
  }

  getAllQty(){
    return Promise.resolve({
      data: {
        "ADX": {
          current: 6953,
          target: 98654
        },

        "CVC": {
          current:3532,
          target: 6375
        },

        "EOS": {
          current: 3423,
          target: 9584
        },

        
      },
      success: true, 
      timestamp: "1513930877362", 
      version: 8585
    })
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