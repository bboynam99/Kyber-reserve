import React from 'react';

const ItemHead = (props) => {
    return (
        <div>
            <div className="logo">
                <img src="/img/knc.png" alt="" />
            </div>
            <div className="setting">
                <span>settings</span>
                <i className="fa fa-cog"></i>
            </div>
            <div className="row">
                <div className="col-6 col-md-2">
                    <div className="label">TOKEN</div>
                    <div className="value">{props.data.title}</div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="label">
                        <span className="mr-auto">current reserve qty</span>
                        <span className="text-secondary">target</span>
                    </div>
                    <div className="value">
                        <span className="mr-auto">{props.data.reserve.current}</span>
                        <small>/ {props.data.reserve.target}</small>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="label">
                        <span className="mr-auto">current reserve qty</span>
                        <span className="text-secondary">target</span>
                    </div>
                    <div className="value">
                        <span className="mr-auto">{props.data.reserve.current}</span>
                        <small>/ {props.data.reserve.target}</small>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="label">&nbsp;</div>
                    <div className="value value-progress">{props.data.percent}%</div>
                    <div className="progress">
                        <div className="progress-bar bg-knc" style={{ width: props.data.percent + "%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemHead;
