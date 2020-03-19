import React, { Component } from 'react';

import { ProductsTable, ModalContainer } from './Components';

import './App.scss'

export class App extends Component {
  render() {
    return (
      <div className='page'>
        <ProductsTable />
        <ModalContainer />
      </div>
    );
  }
}