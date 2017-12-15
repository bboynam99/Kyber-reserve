import React, { Component } from 'react';
import ItemHead from './ItemHead';
import ItemData from './ItemData';
import ItemBalances from './ItemBalances';
import * as api from '../../api/getData';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
        this.getData();
    }

    getData() {
        let count = 0;
        setInterval(() => {
            api.getData(++count).then(data => {
                this.setState({
                    data: data
                })
            })
        }, 2000)
    }

    render() {
        return (
            <section>
                <div>
                    <div className="container py-5">
                        <div className="page-title">
                            <img src="/img/dashboard.png" alt="" />
                            <h5 className="title py-2">Kyber Reserve</h5>
                        </div>

                        <ul className="reserves pt-md-5">
                            {this.state.data.map((item,i) =>
                                <li key={i}>
                                    <ItemHead data={item} />
                                    <ItemData data={item} />
                                    <hr />
                                    <ItemBalances data={item} />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;
