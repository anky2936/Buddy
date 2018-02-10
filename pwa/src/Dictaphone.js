import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

class Dictaphone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.finalTranscript) {
      this.props.finalizeTranscript(nextProps.finalTranscript);
    }
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
  render() {
    const { transcript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      console.error('No Support');

      return null;
    }

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