import React from 'react';

// All the groups explained:
// #underlay - solid gradient path to sit below separate gradient paths to hide any white showing through
// #overlay - separate gradient paths to mock out an angular gradient
// #solid-gray - gray paths sitting on top of gradient, where we're changing the stroke-dashoffset values to get the gradient-filling animation

const GradientTrack = ({ size, getCircle }) => {
  return (
    <div style={{ height: size, width: size }} className="gradient-track">
      <svg width="189px" height="161px" viewBox="7 7 189 161" preserveAspectRatio="xMaxYMin">
        <defs>
          <linearGradient x1="95.6223444%" y1="66.7855148%" x2="0%" y2="80.7625248%" id='underlay-gradient'>
            <stop stopColor='blue' offset="0%" />
            <stop stopColor='green' offset="18.7551648%" />
            <stop stopColor='orange' offset="34.3482343%" />
            <stop stopColor='orange' offset="74.3486694%" />
            <stop stopColor='red' offset="100%" />
          </linearGradient>
          <linearGradient x1='0%' y1='0%' x2="127.656085%" y2="100%" id='green-blue'>
            <stop stopColor='green' offset="0%" />
            <stop stopColor='blue' offset="100%" />
          </linearGradient>
          <linearGradient x1='0%' y1='0%' x2="98.1965144%" y2="21.0873235%" id='orange-green'>
            <stop stopColor='orange' offset="0%" />
            <stop stopColor='green' offset="100%" />
          </linearGradient>
          <linearGradient x1='0%' y1='100%' x2="60.2500654%" y2="30.0731402%" id='red-orange'>
            <stop stopColor='red' offset="0%" />
            <stop stopColor='orange' offset="100%" />
          </linearGradient>
        </defs>
        <g id="underlay" stroke='url(#underlay-gradient)'transform="translate(7.000000, 7.000000)" strokeWidth='8' fill="none">
          <path d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6" />
        </g>
        <g id="overlay" stroke="none" strokeWidth='8' fill="none" fillRule="evenodd" transform="translate(7.000000, 7.000000)">
          <path d="M186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27" stroke='url(#green-blue)' />
          <path d="M158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5" stroke='url(#orange-green)' />
          <path d="M93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27" stroke={'orange'} />
          <path d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92" stroke={'blue'} />
          <path d="M0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6" stroke={'red'} />
          <path d="M28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92" stroke='url(#red-orange)' />
        </g>
        <g id="solid-gray" stroke="none" fill="none" fillRule="evenodd" transform="translate(7.000000, 7.000000)">
          <path d="M160.2,158.6 C177.203075,141.238684 186.717829,117.900607 186.7,93.6 L186.7,92 C186.293226,67.4708179 176.190137,44.1006823 158.6,27 C141.238684,9.99692529 117.900607,0.482170706 93.6,0.5 C69.2993928,0.482170706 45.9613155,9.99692529 28.6,27 C11.0098634,44.1006823 0.906773963,67.4708179 0.5,92 L0.5,93.6 C0.482170706,117.900607 9.99692529,141.238684 27,158.6" ref={circle => getCircle(circle)} className="donutchart-track" />
        </g>
      </svg>
    </div>
  );
};

export default GradientTrack;
