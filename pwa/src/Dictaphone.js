import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

class Dictaphone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    if(!this.props.listening) {
      this.props.startListening();
    }

    this.props.resetTranscript();
    
    setTimeout(() => {
      this.setState({loaded: true});
    }, 300);
  }
  componentWillUnmount() {
    this.props.finalizeTranscript(this.props.transcript);
  }
  render() {
    const { transcript, resetTranscript, start } = this.props

    return (
      <div className={"app-dictaphone" + (this.state.loaded ? " loaded" : null)}>
        <div className="app-dictaphone__body">
          <span>{transcript}</span>
        </div>
      </div>
    )
  }
}

export default SpeechRecognition({autoStart: false})(Dictaphone);