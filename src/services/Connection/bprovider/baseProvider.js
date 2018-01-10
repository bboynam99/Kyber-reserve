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

}
