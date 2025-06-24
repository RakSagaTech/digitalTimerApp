// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    isTimmerRunning: false,
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes} = this.state
    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label"> Set Timer Limit </p>
        <div className="timer-limit-controller">
          <button type="button" className="limit-controller-button">
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value"> {timerLimitInMinutes} </p>
          </div>
          <button type="button" className="limit-controller-button">
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isTimmerRunning} = this.state
    const startOrPauseImageUrl = isTimmerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const startOrPauseAltText = isTimmerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button type="button" className="timer-controller-btn">
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {' '}
            {isTimmerRunning ? 'Pause' : 'Start'}{' '}
          </p>
        </button>
        <button type="button" className="timer-controller-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label"> Reset </p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = totalRemainingSeconds / 60
    const seconds = totalRemainingSeconds % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }
  render() {
    const {isTimmerRunning} = this.state
    const labelText = isTimmerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading"> Digital Timmer </h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state"> {labelText} </p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
