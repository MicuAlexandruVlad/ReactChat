import React, { Component } from 'react'
import './MessageSent.scss'

export default class MessageSent extends Component {

    convertUnix(unix) {

        var date = new Date(unix * 1000)

        var hours = date.getHours()
        var minutes = "0" + date.getMinutes()

        var formattedTime = hours + ':' + minutes.substr(-2)

        return formattedTime
    }


    render() {
        return (
            <div className="message-sent-body flex-row">
                <div className="message-sent-timestamp">
                    { this.convertUnix(parseInt(this.props.message.timestamp)) }
                </div>
                <div className="message-sent-holder flex-col">
                    <span className="message-sent">
                        { this.props.message.text }
                    </span>
                </div>
                <div className="message-sent-triangle"></div>
            </div>
        )
    }
}
