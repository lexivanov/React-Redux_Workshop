import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ProductsTable } from './Components';
import { getProducts } from './Store/Reducers/Products';

import './App.scss'

export class AppInternal extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    console.log(this.props.products);
    return (
      <div className='page'>
        <ProductsTable />
      </div>
    );
  }
}

export const App = connect(
  state => ({
    products: state.products
  }),
  dispatch => ({
    loadProducts: () => dispatch(getProducts())
  })
)(AppInternal);