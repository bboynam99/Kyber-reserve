
export function getData(x) {
    let data = [
        {
            title: 'KNC',
            percent: 40,
            reserve: {
                current: 6953 + x,
                target: 98563 + x,
            },
            data: [
                { rate: 'Reserve', symbol: 'KNC/ETH', ask: (0.7697399673695822 + x), bid: 0.8697399673695822 },
                { rate: 'Bittrex', symbol: 'KNC/ETH', ask: (0.7697399673695822 + x), bid: 0.8697399673695822 },
                { rate: 'Poloniex', symbol: 'KNC/ETH', ask: (0.7697399673695822 + x), bid: 0.8697399673695822 },
                { rate: 'Binance', symbol: 'KNC/ETH', ask: 0.7697399673695822, bid: 0.8697399673695822 },
                { rate: 'Liqui', symbol: 'KNC/ETH', ask: 0.7697399673695822, bid: 0.8697399673695822 },
            ],
            balances: [
                { rate: 'Bittrex', value: 3000  + x},
                { rate: 'Poloniex', value: 4790 + x },
                { rate: 'Binance', value: 5215 + x },
                { rate: 'Bittfinex', value: 3240 },
                { rate: 'Liqui', value: 6080 },
            ]
        }
    ]
    for(let i = 0; i< 22; i++){
        data.push(data[0]);
    }
    return Promise.resolve(data);
}