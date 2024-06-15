import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assests/whyweus.json';

class LottiePage extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      renderer: 'svg',
    };
    return (
      <div>
        <Lottie options={defaultOptions} />
      </div>
    );
  }
}
export default LottiePage;
