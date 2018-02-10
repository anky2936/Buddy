import React, { Component } from 'react'
import Webcam from 'react-webcam';

export default class Snapshot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.snapshotActive) {
      setTimeout(() => {
        const imageSrc = this.webcam.getScreenshot();

        this.props.onCapture(imageSrc);
      }, 500);
    }
  }
  setRef = (webcam) => {
    this.webcam = webcam;
  }
  render() {
    return (
      <Webcam className={this.state.active ? "app-webcam" : "hidden"} height={700} width={412} audio={false} ref={this.setRef}  screenshotFormat="image/jpeg"/>
    )
  }
}