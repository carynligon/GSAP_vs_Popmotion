import React, { Component } from 'react';
import { Linear, TweenMax } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import Snap from 'snapsvg-cjs';
import './IS.css';

export const plotScore = (arc, point, percentage) => {
  const snap = Snap.path.toCubic(arc.getAttribute('d'));
  const bezier = [];
  snap.forEach((item) => {
    if (item.length === 3) {
      bezier.push({
        x: item[1] - 8.5,
        y: item[2]
      });
    }
    else {
      bezier.push({
        x: item[1] - 8.5,
        y: item[2]
      }, {
        x: item[3] - 8.5,
        y: item[4]
      }, {
        x: item[5] - 8.5,
        y: item[6]
      });
    }
  });
  console.log(percentage)

  TweenMax.to(point, 0, {
    bezier: [bezier.reverse()[0]],
    onComplete: () => {
      TweenMax.to(point, 1, {
        bezier: bezier,
        ease: Linear.easeNone
      }).pause(percentage);
    }
  });
  
  // TweenMax.to(point, 1, { bezier: bezier.reverse(), ease: Linear.easeNone }).pause(percentage)
};

const getPersonalHeader = (img, header = '', name = '') => {
  const start = header.substring(0, header.indexOf('[NAME]'));
  const end = header.substring(header.indexOf('[NAME]') + 6, header.length);
  if (img) {
    const imgName = (<span className="no-wrap">{img} {name}</span>);
    return (<span>{start}{imgName}{end}</span>);
  }
  return (<span>{start}{name}{end}</span>);
};
/* eslint-enable */

export class InsurabilityScoreComponent extends Component {
  // TODO in another story
  // Move donut chart, points into separate components
  // Remove state when not necessary

  state = {
    avgScore: 0,
    avgRating: {},
    circSize: undefined,
    counterComplete: false,
    error: false,
    userRating: '',
    userScore: 0,
  };

  componentDidMount() {
    const { score } = this.props;
    if (score && (!score.error || !this.state.error)) {
      this.updateScore(score);
    } else if (score && score.error) {
      this.setError();
    }
  }

  // TODO: refactor this to maybe use PromiseHOC
  componentWillReceiveProps(nextProps) {
    const { error } = this.state;
    const { isLoading, score, showDetails } = nextProps;
    if (!isLoading && score && showDetails && !score.error && !error) {
      this.updateScore(score);
    } else if (score && score.error) {
      this.setState({ error: true });
    }
  }

  onScoreComplete = () => {
    this.setState({
      counterComplete: true,
    });
  };

  setError = () => this.setState({ error: true });

  getAvgColor = (avg, score, userRating) => {
    if (score > avg) {
      return userRating;
    }
    return 'gray';
  };

  setPositions = (resp) => {
    const { 
      max_score: max, 
      visual_min_score: visualMin,
      your_score: score } = resp;
    const percentage = (score - visualMin) / (max - visualMin) * 100;
    TweenMax.fromTo(this.stroke, 2, {
      drawSVG: 0,
    },{
      drawSVG: `${percentage}%`,
      onComplete: () => {
        plotScore(this.path, this.point, percentage / 100)
      }
    });
  };

  getValueAvgRange = () => {
    const avg = 700;
    // generate a number between 1 and 20
    const randomNum = Math.ceil(Math.random() * 20);
    // generate a number between 0 and 1 and
    // if it's above .5 we'll add the random number
    // to the avg, otherwise, we'll subtract it
    const negOrPos = Math.random() > 0.5 ? 1 : -1;
    const fakeScore = avg + (negOrPos * randomNum);
    this.setPositions(fakeScore, avg);
  };

  getRandomValue = () => {
    const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min)) + min);
    // once we switch over completely to 300-950 range we can
    // update the min value here to 300, but for now keep the
    // larger range so we can test backwards compatibility
    const score = getRandomInt(0, 950);
    const response = {
      max_score: 950,
      min_score: 500,
      visual_min_score: 300,
      your_score: score < 500 ? score + 450 : score,
      average_score: 700,
    };
    this.updateScore(response);
  };

  updateScore = (resp) => {
    if (resp) {
      this.setState({ response: resp }, () => {
        this.setPositions(resp);
      });
      if (resp.error) {
        this.getValueAvgRange();
      }
    }
  };

  reloadPage = () => {
    window.location.reload(false);
  };

  render() {
    const { response } = this.state;
    return (
      <div className="insurability-score-wrap" onClick={this.getRandomValue}>
      <div className="counter">
        <h2>{response && response.your_score}</h2>
      </div>
      <div className="data-point" ref={(point) => this.point = point}></div>
        <svg width="189px" height="161px" viewBox="-1 -1 189 161">
            <g id="underlay" stroke="none" strokeWidth="15" fill="none" fillRule="evenodd">
                <path d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6" stroke="#FFFFFF" ref={(path) => this.path = path}></path>
            </g>
            <g id="overlay" stroke="none" strokeWidth="15" fill="none" fillRule="evenodd">
              <path d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6"  transform="translate(93.600000, 79.549987) scale(-1, 1) translate(-93.600000, -79.549987)" stroke="#2a1861" ref={(stroke) => this.stroke = stroke}></path>
          </g>
        </svg>
      </div>
    );
  }
}


