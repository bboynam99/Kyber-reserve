import Web3 from "web3"
import * as ethUtil from 'ethereumjs-util'
import CONSTANTS from "../../constants"
import BLOCKCHAIN_INFO from "../../../../env"

export default class BaseEthereumProvider {

  initContract() {
    this.erc20Contract = new this.rpc.eth.Contract(CONSTANTS.ABIS.ERC20)
    this.networkAddress = BLOCKCHAIN_INFO.network
    this.wrapperAddress = BLOCKCHAIN_INFO.wrapper
    this.networkContract = new this.rpc.eth.Contract(CONSTANTS.ABIS.KYBER_NETWORK, this.networkAddress)
    this.wrapperContract = new this.rpc.eth.Contract(CONSTANTS.ABIS.KYBER_WRAPPER, this.wrapperAddress)
  }

  version() {
    return this.rpc.version.api
  }

  getAllRatesFromServer(tokens) {
    return new Promise((resolve, rejected) => {
      fetch(BLOCKCHAIN_INFO.history_endpoint + '/getRate', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
        .then(function (response) {
          if (response.status == 404) {
            rejected(err)
          } else {
            resolve(response.json())
          }
        })
        .catch((err) => {
          rejected(err)
        })
    })
  }

  getAllRate(sources, dests, quantity) {
    var dataAbi = this.wrapperContract.methods.getExpectedRates(this.networkAddress, sources, dests, quantity).encodeABI()

    return new Promise((resolve, rejected) => {
      this.rpc.eth.call({
        to: this.wrapperAddress,
        data: dataAbi
      })
      .then((data) => {
        try {
          var dataMapped = this.rpc.eth.abi.decodeParameters([
            {
              type: 'uint256[]',
              name: 'expectedPrice'
            },
            {
              type: 'uint256[]',
              name: 'slippagePrice'
            }
          ], data)
          resolve(dataMapped)
        } catch (e) {
          console.log(e)
          resolve([])
        }
      })
      .catch((err) => {
        console.log("GET request error")
        resolve([])
      })
    })
  }

  getAllRatesFromBlockchain(tokensObj) {
    var arrayTokenAddress = Object.keys(tokensObj).map((tokenName) => {
      return tokensObj[tokenName].address
    });

    var arrayEthAddress = Array(arrayTokenAddress.length).fill(constants.ETH.address)

    var arrayQty = Array(arrayTokenAddress.length * 2).fill("0x0")

    return this.getAllRate(arrayTokenAddress.concat(arrayEthAddress), arrayEthAddress.concat(arrayTokenAddress), arrayQty).then((result) => {
      var returnData = []
      Object.keys(tokensObj).map((tokenSymbol, i) => {
        returnData.push({
          source: tokenSymbol,
          dest: "ETH",
          rate: result.expectedPrice[i],
          minRate: result.slippagePrice[i]
        })

        returnData.push({
          source: "ETH",
          dest: tokenSymbol,
          rate: result.expectedPrice[i + arrayTokenAddress.length],
          minRate: result.slippagePrice[i + arrayTokenAddress.length]
        })
      });
      return returnData
    })
  }

  sendToOtherEndpoint(url, method, data) {
    var fetchParams = {
        // headers: {
        //     'Accept': 'application/json, text/plain, */*',
        //     'Content-Type': 'application/json'
        // }
    }
    if(method == "POST") {
        fetchParams.method = "POST"
        fetchParams.body = data 
    }
    return new Promise((resolve, reject) => {
      fetch(url, fetchParams)
        .then((response) => {
          if (!response.ok) {
            reject(response.statusText);
          } else {
            resolve(response.json())
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

}
