// Write your code here

import {Component} from 'react'
import './index.css'


class DigitalTimer extends Component {

  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    isTimmerRunning: false
  }


  renderTimerLimitController = () =>{
    const {timerLimitInMinutes} = this.state
    return (
      <div>
        <p> Set Timer Limit </p>
        <div>
          <button type="button">
            -
          </button>
          <div>
            <p> {timerLimitInMinutes} </p>
          </div>
          <button type="button">
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () =>{
    const {isTimmerRunning} = this.state 
    const startOrPauseImageUrl= isTimmerRunning ? 
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png':
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const startOrPauseAltText  = isTimmerRunning ? 'pause icon' : 'play icon'
    return (
      <div>
        <button type="button">
          <img 
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
          />
          <p> {isTimmerRunning? 'Pause': 'Start'} </p>
        </button>
        <button type="button">
          <img 
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p> Reset </p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () =>{
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state 
    const totalRemainingSeconds = ((timerLimitInMinutes * 60)- timeElapsedInSeconds)

    const minutes = (totalRemainingSeconds / 60)
    const seconds = (totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }
  render() {
    const {isTimmerRunning} = this.state 
    const labelText = isTimmerRunning? 'Running' : 'Paused'
    return (
      <div>
        <h1> Digital Timmer </h1>
        <div>
          <div>
            <div>
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p> {labelText} </p>
            </div>
          </div>
          <div>
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
