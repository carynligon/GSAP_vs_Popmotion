import React, { Component } from 'react';
import { Linear, TimelineMax, TweenMax } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Snap from 'snapsvg-cjs';
import './IS.css';

export class InsurabilityScoreComponent extends Component {
  // TODO in another story
  // Move donut chart, points into separate components
  // Remove state when not necessary
  constructor() {
    super();
    this.setNewValue = this.setNewValue.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
    this.state = {
      perc: 50,
      estimate: 675,
      min: 400,
      max: 950
    }
  }

  setNewValue() {
    const { max, min } = this.state;
    const estimate = Math.floor((Math.random() * (max - min)) + min);
    this.updateTimeline(estimate);
  }

  updateGraph() {}

  updateTimeline(estimate = 0) {
    const { max, min } = this.state;
    const perc = (estimate - min) / (max - min);
    TweenMax.fromTo(this.track, 1, {
      drawSVG: 0
    }, {
      drawSVG: `${perc * 100}%`,
      onComplete: () => {
        TweenMax.set([this.graphDot, this.dragger], {
          visibility: 'visible'
        });
        TweenMax.to(this.tl, 0.5, {
          progress: perc
        });
      }
    });
  }

  componentDidMount() {
    const snap = Snap.path.toCubic(this.graphLine.getAttribute('d'));
    const graphBezier = [];
    snap.forEach((item) => {
      if (item.length === 3) {
        graphBezier.push({
          x: item[1],
          y: item[2]
        });
      }
      else {
        graphBezier.push({
          x: item[1],
          y: item[2]
        }, {
          x: item[3],
          y: item[4]
        }, {
          x: item[5],
          y: item[6]
        });
      }
    });
    
    TweenMax.set('svg', {
      visibility: 'visible'
    })
    
    this.tl = new TimelineMax({
      onUpdate: this.updateGraph,
      paused: true
    });

    this.tl.to([this.graphDot, this.dragger], 5, {
      bezier: {
        type: "cubic",
        values: graphBezier,
        autoRotate: false
      },
      ease: Linear.easeNone
    });

    TweenMax.set(this.track, {
      drawSVG: '0%'
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div className="wrapper" onClick={this.setNewValue}>
        <svg className="mainSVG" viewBox="0 0 220 220" preserveAspectRatio="xMidYMid meet">
          <g id="uiGroup" transform="translate(15 10)">
          <path id="graphLine" d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6"  stroke="#2a1861" ref={(graphLine) => this.graphLine = graphLine}></path>
          <path id="graphLine-track" d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6" stroke="#2a1861" ref={(track) => this.track = track}></path>
          </g>
          <circle id="graphDot" fill="#FFF" cx="15" cy="10" r="5" ref={(dot) => this.graphDot = dot} />
          <circle id="dragger" fill="#fff" cx="15" cy="10" r="5" stroke="none" strokeWidth="10" ref={(dragger) => this.dragger = dragger}/>
        </svg>
    </div>
    );
  }
}


