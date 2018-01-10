import Web3 from "web3"
import BaseEthereumProvider from "./baseProvider"

export default class HttpProvider extends BaseEthereumProvider {
    constructor(props) {
        super(props)
        this.rpcUrl = props.url
        this.rpc = new Web3(new Web3.providers.HttpProvider(this.rpcUrl, 9000))
        this.connection = true
        this.initContract()        
        this.intervalId = null
    }

    isConnected(){
        return this.connection
    }

    send(url, method, data) {
        var fetchParams = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
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