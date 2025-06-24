// Write your code here

import {Component} from 'react'
import './index.css'


const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}


class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)


  onDecreaseTimerLimitInMinutes = () =>{
   const {timerLimitInMinutes} = this.state


    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }

  }

  onIncreaseTimerLimitInMinutes = () =>{

    this.setState(prevState => (
      {timerLimitInMinutes: prevState.timerLimitInMinutes + 1}
    ))
  }


  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0 
    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label"> Set Timer Limit </p>
        <div className="timer-limit-controller">
          <button type="button" className="limit-controller-button" onClick={this.onDecreaseTimerLimitInMinutes} disabled={isButtonDisabled}
>
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value"> {timerLimitInMinutes} </p>
          </div>
          <button type="button" className="limit-controller-button" onClick={this.onIncreaseTimerLimitInMinutes } disabled={isButtonDisabled}
>
            +
          </button>
        </div>
      </div>
    )
  }


  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () =>{
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state 
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

     if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
     }else{
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1
      }))
     }
  }

  onStartOrPauseTimer = () =>{
    const {isTimmerRunning, timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimerElapsed = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerElapsed){
      this.setState({timeElapsedInSeconds: 0})
    } 

    if (isTimmerRunning){
      this.clearTimerInterval()
    }else{
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({
      isTimmerRunning: !prevState.isTimmerRunning
    }))
  }

  renderTimerController = () => {
    const {isTimmerRunning} = this.state
    const startOrPauseImageUrl = isTimmerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const startOrPauseAltText = isTimmerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button type="button" className="timer-controller-btn" onClick={this.onStartOrPauseTimer}>
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
        <button type="button" className="timer-controller-btn" onClick={this.onResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label" > Reset </p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }
  render() {
    const {isTimmerRunning} = this.state
    const labelText = isTimmerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading"> Digital Timer </h1>
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
