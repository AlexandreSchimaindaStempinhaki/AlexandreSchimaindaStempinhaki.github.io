import React from "react";
import './style.css'

export default class Counter extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            val: this.props.val
        }
    }


    addVal = (v) => {
        this.setState({
            val: parseInt(this.state.val) + v
        });
    }
    render() {
        return (
            <div>
                <hr/>
                <button onClick={() => this.addVal(-1)} className="botao">-</button>
                <h1 style={{display: 'inline'}}>{this.state.val}</h1>
                <button onClick={() => this.addVal(1)} className="botao">+</button>
                <hr/>
            </div>
        )
    }
}