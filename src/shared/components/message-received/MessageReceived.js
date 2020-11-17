import React, { Component } from 'react'
import './MessageReceived.scss'

export default class MessageReceived extends Component {

    convertUnix(unix) {

        var date = new Date(unix * 1000)

        var hours = date.getHours()
        var minutes = "0" + date.getMinutes()

        var formattedTime = hours + ':' + minutes.substr(-2)

        return formattedTime
    }


    render() {
        return (
            <div className="message-received-body flex-row">
                <div className="message-received-triangle"></div>
                <div className="message-received-holder flex-col">
                    <span className="meesage-received">
                        { this.props.message.text }
                    </span>
                </div>
                <span className="message-received-timestamp">
                    { this.convertUnix(parseInt(this.props.message.timestamp)) }
                </span>
            </div>
        )
    }
}
