import React, { Component } from 'react'
import './Button.scss'

export default class Button extends Component {
    render() {
        return (
            <div 
                className={ this.props.centered ? "flex-row btn-body centered" : "flex-row btn-body" }
                onClick={ () => this.props.onClick() }>
                { this.props.text }
            </div>
        )
    }
}
