import React, { Component } from 'react';
import speaker from './speaker-icon.svg';
import './App.css';
import Dictaphone from './Dictaphone';
import Snapshot from './Snapshot';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: false,
      transcript: '',
      snapshotActive: false
    };
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
      listening: false,
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
  
      this.setState({
        snapshotActive: true
      });  
    } else {
      console.error('No intent recognized');
    }
  }
  onCapture = (snapshot) => {
    this.setState({
      snapshotActive: false
    });

    console.log(snapshot);
  }
  render() {
    return (
      <div className="app-wrapper" onClick={this.onScreenTap}>
        <div className={"app app--top" + (this.state.listening ? " active" : "")}>
          <div className={"app-logo" + (this.state.listening ? " hidden" : "")}>
            <img src={speaker} alt="speaker-icon" />
          </div>
        </div>
        <div className={"app app--bottom" + (this.state.listening ? " active" : "")}>
          <p className={"app-banner" + (this.state.listening ? " hidden" : "")}>Tap to speak</p>
        </div>
        {
          this.state.listening ? (
            <Dictaphone finalizeTranscript={this.finalizeTranscript} />
          ) : null
        }
        <Snapshot snapshotActive={this.state.snapshotActive} onCapture={this.onCapture}/>
      </div>
    );
  }
}

export default App;
