import Web3 from "web3"
import BaseEthereumProvider from "./baseProvider"
// const wss = new WebSocket.Server({ port: 8080 });

// function heartbeat() {
//   this.isAlive = true;
// }

// wss.on('connection', function connection(ws) {
//   ws.isAlive = true;
//   ws.on('pong', heartbeat);
// });

// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();

//     ws.isAlive = false;
//     ws.ping('', false, true);
//   });
// }, 30000);
export default class WsProvider extends BaseEthereumProvider {
  constructor(props) {
    super(props)
    this.connection = true
    this.reconnectTime = 0
    this.rpcUrl = props.url
    this.provider = new Web3.providers.WebsocketProvider(this.rpcUrl)
    this.provider.on('end', (err) => {
      console.log(err)
      props.failEvent()
    })
    this.provider.on('error', (err) => {
      console.log(err)
      props.failEvent()
    })

    this.rpc = new Web3(this.provider)
    this.initContract()
  }

  isConnected() {
    return this.connection
  }

  send(url, method, data) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://' + url)
      ws.on('open', function open() {
        resolve(ws);
      })

      ws.on('close', function close() {
        reject('disconnected');
      })

      ws.on('message', function incoming(data) {
        resolve(data)
      });
    })
  }

}