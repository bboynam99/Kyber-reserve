import Token from "./token"
import CONSTANT from "./constant"
import { mappingTokenRate, mappingTokenBalance, mappingQty } from "./standardize"

export default class TokensService {
  constructor(){
    this.tokens = {}
    Object.keys(CONSTANT.SUPPORTED_TOKENS).forEach((tokenName) => {
      this.tokens[tokenName] = new Token(CONSTANT.SUPPORTED_TOKENS[tokenName]);
    })
  }

  async syncAll(service){
    let [allRate, allBalance, allQty] = await Promise.all([
                                          this.getAllRate(service),
                                          this.getAllBalance(service),
                                          this.getAllQty(service)
                                        ])


    if(allRate && allRate.data && allRate.success){
      Object.keys(allRate.data).forEach((pair) => {
        let tokenSymbol = pair.split('-')[0]
        if(tokenSymbol && this.tokens[tokenSymbol]){
          let mappedRate = mappingTokenRate(tokenSymbol, allRate.data[pair])
          this.tokens[tokenSymbol].setRates(mappedRate)
        }
      })
    }

    if(allBalance && allBalance.data && allBalance.success){
      Object.keys(allBalance.data).forEach((tokenSymbol) => {
        let mappedBalance = mappingTokenBalance(allBalance.data[tokenSymbol])
        this.tokens[tokenSymbol].setBalance(mappedBalance)
      })
    }

    if(allQty && allQty.data && allQty.success){
      Object.keys(allQty.data).forEach((tokenSymbol) => {
        let mappedQty = mappingQty(allQty.data[tokenSymbol])
        this.tokens[tokenSymbol].setQty(mappedQty)
      })
    }
    return this.tokens
  }

  getTokens(){
    return this.tokens
  }

  getAllRate(service){
    // return service.getPriceAllBaseQuotePair()
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

  getAllBalance(service){
    // return service.getBalanceAllTokenOnBlockChain()
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

  getAllQty(sevice){
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
}
