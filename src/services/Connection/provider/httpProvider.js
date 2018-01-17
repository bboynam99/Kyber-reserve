import Web3 from "web3"
import BaseEthereumProvider from "./baseProvider"

import CONSTANTS from "../../constants"
import Crypto from "crypto"
import BLOCKCHAIN_INFO from "../../../../env"

const hmac512 = Crypto.createHmac("sha512", CONSTANTS.SECRET_API_KEY)

export default class HttpProvider extends BaseEthereumProvider {
  constructor(props) {
    super(props)
    this.rpcUrl = props.url
    this.rpc = new Web3(new Web3.providers.HttpProvider(this.rpcUrl, 9000))
    this.connection = true
    this.initContract()
    this.intervalId = null
  }

  isConnected() {
    return this.connection
  }

  signHeader(message) {
    return Crypto.createHmac('sha512', CONSTANTS.SECRET_API_KEY)
      .update(message)
      .digest('hex')
  }

  paramQuery(data) {
    return Object.keys(data).sort().map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
  }

  send(path, method, data) {
    data = data || {}
    let fetchParams = {}

    if(BLOCKCHAIN_INFO.signRequest){
      data.nonce = Date.now()
      let paramMess = this.paramQuery(data)
      let signHeader = this.signHeader(paramMess)

      fetchParams.headers= {
        'Content-Type': 'application/x-www-form-urlencoded',
        'signed': signHeader
      }
    }

    if (method == "POST") {
      fetchParams.method = "POST"
      if(!BLOCKCHAIN_INFO.signRequest) fetchParams.body = data
    }
    let url = this.rpcUrl + path
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