import React, { Component } from 'react';
import speaker from './speaker-icon.svg';
import './App.css';
import Dictaphone from './Dictaphone';
import axios from 'axios';
import Webcam from 'react-webcam';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: false,
      transcript: '',
      takeSnapshot: false
    };
  }
  setRef = (webcam) => {
    this.webcam = webcam;
  }
  onScreenTap = () => {
    const isListening = this.state.listening;

    this.setState({
      listening: !isListening
    });
  }
  abortSynthesis = () => {
    this.setState({
      listening: false,
      transcript: ''
    });
  }
  finalizeTranscript = (transcript) => {
    console.log(transcript);

    this.setState({
      transcript: transcript
    }, () => {
      this.extractTask();
    });
  }
  extractTask = () => {
    const transcript = this.state.transcript.toLowerCase();
    const DOExp = (transcript.indexOf('find') !== -1) || (transcript.indexOf('where') !== -1);

    if(DOExp) {
      const keyword = transcript.split(' ')[transcript.length - 1];

      // this.sendRequest({
      //   intent: 'DO',
      //   entity: keyword
      // });    
      this.setState({
        takeSnapshot: true,
        listening: false
      }, () => {
        setTimeout(() => {
          this.onCapture();
        }, 500); 
      });  

    } else {
      console.error('No intent recognized');
    }
  }
  onCapture = () => {
    const imageSrc = this.webcam.getScreenshot();

    console.log(imageSrc);

    this.setState({
      takeSnapshot: false,
    });
  }
  render() {
    return (
      <div className="app-wrapper" onClick={this.onScreenTap}>
        <div className={"app app--top " + (this.state.listening ? "active" : "")}>
          <div className="app-logo">
            <img src={speaker} alt="speaker-icon" />
          </div>
        </div>
        <div className={"app app--bottom " + (this.state.listening ? "active" : "")}>
          <p className="app-banner">Tap to speak</p>
        </div>
        {
          this.state.listening ? (
            <Dictaphone finalizeTranscript={this.finalizeTranscript} />
          ) : null
        }
        {
          this.state.takeSnapshot ? (
            <Webcam className="app-webcam" audio={false} ref={this.setRef}  screenshotFormat="image/jpeg"/>
          ) : null
        }
      </div>
    );
  }
}

export default App;
