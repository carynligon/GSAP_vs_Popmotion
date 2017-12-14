import React, { Component } from 'react';
// import ScoreComponentPop from './IS_Pop';
// import ScoreComponentGSAP from './IS_GSAP';
import { InsurabilityScoreComponent } from './InsurabilityScore';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>SVG Animations</h1>
        <h3>Popmotion vs GSAP</h3>
        <InsurabilityScoreComponent />
      </div>
    );
  }
}

export default App;
