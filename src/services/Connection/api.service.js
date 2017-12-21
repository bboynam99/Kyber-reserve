import Provider from "./provider"

export default class ApiService{
  constructor(){
    this.provider = new Provider('http')
  }

  getPriceBaseQuotePair(base, quote){
    return new Promise((resolve, reject) => {
      this.provider.send('/prices/' + base + '/' + quote, "GET", null)
        .then((data) => { 
          resolve(data) 
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getPriceAllBaseQuotePair(){
    return new Promise((resolve, reject) => {
      this.provider.send("/prices", "GET", null)
        .then((data) => { 
          resolve(data) 
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}