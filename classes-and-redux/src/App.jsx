import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProducts } from './Store/Reducers/Products';

export class ProductsTableInternal extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    console.log(this.props.products);
    return <div />;
  }
}

export const ProductsTable = connect(
  state => ({
    products: state.products
  }),
  dispatch => ({
    loadProducts: () => dispatch(getProducts())
  })
)(ProductsTableInternal);