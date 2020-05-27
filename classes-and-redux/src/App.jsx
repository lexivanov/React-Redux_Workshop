import React, { Component } from 'react';

import { ProductsTableInternal, ModalContainer, SpinnerOverlay } from './Components';

import './App.scss'

export class App extends Component {
  render() {
    return (
      <div className='page'>
        <ProductsTableInternal />
        <ModalContainer />
        <SpinnerOverlay />
      </div>
    );
  }
}