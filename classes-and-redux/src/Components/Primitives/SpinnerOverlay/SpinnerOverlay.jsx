import React from 'react';
import { connect } from 'react-redux';

import './SpinnerOverlay.scss'

const SpinnerOverlayInternal = (props) => {
  return props.text
    ? (
      <div className='overlay-layout'>
        <div className='global-overlay' />
        <div className='overlay-text'>{props.text}</div>
      </div>
    )
    : null;
}

export const SpinnerOverlay = connect(
  state => ({
    text: state.spinnerOverlay.text
  })
)(SpinnerOverlayInternal);