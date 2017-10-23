import React, { Component } from 'react';
import { TweenMax, Sine } from 'gsap';

class ScoreComponent extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    TweenMax.to(this.path, 2, {
      strokeDashoffset: 0,
      ease: Sine.easeOut
    })
  }
  componentDidMount() {
    const pathLength = this.path.getTotalLength();
    this.path.style['stroke-dasharray'] = pathLength;
    this.path.style['stroke-dashoffset'] = pathLength;
  }
  render() {
    return (
      <div className="is-wrapper" onClick={this.handleClick}>
        <svg className="progress-icon" width="250" height="250" viewBox="0 0 32 32">
          <g fill="none" transform="translate(1, 1.2)">
              <path id="circle" stroke="#fff" strokeWidth="2" d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z" ref={(path) => this.path = path}/>
          </g>
        </svg>
      </div>
    )
  }
}

export default ScoreComponent;