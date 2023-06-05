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

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementedTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickResetButton = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onClickPlayOrPauseBtn = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementedTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const playOrPauseIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playOrPauseIconAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timerControllerContainer">
        <div className="playOrPauseButtonsContainer">
          <button
            onClick={this.onClickPlayOrPauseBtn}
            className="playOrPauseButtons"
            type="button"
          >
            <img
              className="playOrPauseIcon"
              src={playOrPauseIcon}
              alt={playOrPauseIconAltText}
            />
          </button>
          <p className="timerControllersStatus">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </div>
        <div className="resetButtonContainer">
          <button
            onClick={this.onClickResetButton}
            className="resetButton"
            type="button"
          >
            <img
              className="resetIcon"
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
          </button>
          <p className="timerControllersStatus">Reset</p>
        </div>
      </div>
    )
  }

  onClickDecreaseButton = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onClickIncreaseButton = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timerLimitControllersContainer">
        <h5>Set Timer limit</h5>
        <div className="controllersContainer">
          <button
            className="timerLimitButtons"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onClickDecreaseButton}
          >
            -
          </button>
          <div className="timerLabel">
            <p className="timerControllersStatus">{timerLimitInMinutes}</p>
          </div>
          <button
            className="timerLimitButtons"
            type="button"
            onClick={this.onClickIncreaseButton}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const Minutes = Math.floor(totalRemainingSeconds / 60)
    const Seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = Minutes > 9 ? Minutes : `0${Minutes}`
    const stringifiedSeconds = Seconds > 9 ? Seconds : `0${Seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="appContainer">
        <h1 className="appHeading">Digital Timer</h1>
        <div className="appTimerContainer">
          <div className="displayTimerContainer">
            <div className="displayTimer">
              <h1 className="timerValue">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timerStatus">{labelText}</p>
            </div>
          </div>
          <div className="timerControllersAndLimitContainer">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
