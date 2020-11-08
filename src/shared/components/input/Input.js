import React, { Component } from 'react'
import './Input.scss'

export default class Input extends Component {

    handleValueChange = (event) => {
        this.props.onValueChange(event.target.value, this.props.elementId)
    }

    render() {
        return (
            <div 
                id={ this.props.elementId } 
                className="input-body flex-col"
                >
                    <form className="flex-col" autoComplete="off">
                    <label htmlFor="inp">{ this.props.label }</label>
                    <input 
                        id="inp" 
                        type={ this.props.type } 
                        value={ this.props.value }
                        spellCheck={ false }
                        placeholder={ this.props.placeholder }
                        onChange={ this.handleValueChange }
                        />
                    </form>
            </div>
        )
    }
}
