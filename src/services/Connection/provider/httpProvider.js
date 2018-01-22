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

  signHeader(message, secretKey) {
    return Crypto.createHmac('sha512', secretKey)
      .update(message)
      .digest('hex')
  }

  paramQuery(data) {
    return Object.keys(data).sort().map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
  }

  send(keyString, path, method, body) {
    let data = body || {}
    let fetchParams = {}
    let paramMess

    if(BLOCKCHAIN_INFO.signRequest){
      data.nonce = Date.now()
      
      paramMess = this.paramQuery(data)
      let signHeader = this.signHeader(paramMess, keyString)

      fetchParams.headers= {
        'Content-Type': 'application/x-www-form-urlencoded',
        'signed': signHeader
      }
    } else {
      fetchParams.headers= {
        'Content-Type': 'application/json',
      }
    }

    if(method){
      fetchParams.method = method
    }

    if(body && !BLOCKCHAIN_INFO.signRequest){
      fetchParams.body = data
    }

    let containPrams = path.indexOf("?") > -1 
    let url = paramMess ? this.rpcUrl + path + (containPrams ? "&" : "?") + paramMess : this.rpcUrl + path
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