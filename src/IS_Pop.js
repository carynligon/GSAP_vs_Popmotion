import React, { Component } from 'react';
import { tween, easing, transform } from 'popmotion';
import svg from 'stylefire/svg';
import './App.css';

class ScoreComponent extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.tween.start();
  }
  componentDidMount() {
    const circlePath = svg(this.path);
    const mapCircleOpacityToLength = transform.interpolate([0, 1], [0, 100]);
    const startAnimation = tween({
      from: 0,
      to: 100,
      duration: 3000,
      onUpdate: (v) => {
        circlePath.set({
          pathLength: 100,
        });
      }
    })
    this.tween = tween({
      ease: easing.easeInOut,
      duration: 3000,
      onUpdate: (v) => circlePath.set({
          opacity: v,
          pathLength: mapCircleOpacityToLength(v)
      }),
      onComplete: () => startAnimation.start()
    }).start();
  }
  render() {
    return (
      <div className="is-wrapper" onClick={this.handleClick}>
        <svg className="progress-icon" width="250" height="250" viewBox="0 0 32 32">
          <g fill="none" transform="translate(1, 1.2)">
              <path id="circle" stroke="#fff" strokeWidth="2" d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z" ref={(path) => this.path = path} />
          </g>
      </svg>
      </div>
    );
  }
}

export default ScoreComponent;
