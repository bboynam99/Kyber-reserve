import React from 'react';

const httpEndpoint = "http://52.77.19.90:8000/"
const wsEndpoint = "ws://52.77.19.90:8000/"
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


export default class Provider extends React.Component {
  constructor(type){
    super(type)
    this.initProvider(type)
  }

  initProvider(type){
    switch(type){
      case "http":
        this.currentProvider = "http"
        break
      case "ws":
        this.currentProvider = "ws"
        break
      default:
        this.currentProvider = "http"
        break
    }
  }


  send(path, method, data){
    return new Promise((resolve, reject) => {
      if(this.currentProvider == "http"){
        this.httpRequest(httpEndpoint + path, method, data)
          .then((data) => { resolve(data)})
          .catch((err) => { reject(err)})
      } 
      
      else if(this.currentProvider == "ws"){
        this.wsSend(wsEndpoint + path, data)
        .then((data) => { resolve(data)})
        .catch((err) => { reject(err)})
      }

      else {
        reject("provider not support")
      }

    })
  }

  httpRequest(url, method, data){
    var requestData = method == "POST" ? { method: "POST", body: data} : null
    return new Promise((resolve, reject) => {
      fetch(url, requestData)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  wsSend(url, data){
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

