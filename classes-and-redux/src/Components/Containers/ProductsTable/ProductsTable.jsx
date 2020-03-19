import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts } from '../../../Store/Reducers/Products';
import { Button, Input } from '../../Primitives';

import { ProductTableContent } from './Components';

import './ProductsTable.scss'

class ProductsTableInternal extends Component {
    static propTypes = {
        poructIds: PropTypes.arrayOf(PropTypes.string),
        loadProducts: PropTypes.func
    }

    componentDidMount() {
        this.props.loadProducts();
    }

    state = {
        searchInput: ''
    }

    onChangeSearchInput = value => this.setState({ searchInput: value || '' });

    tableControlsRenderer() {
        return (
            <div className='products-table-controls'>
                <form
                    className='search-form'
                    onSubmit>
                    <Input
                        className='search-input'
                        placeholder='Filter products by name'
                        onChange={this.onChangeSearchInput}
                        value={this.state.searchInput}
                    />
                    <Button className='action-button'>Search</Button>
                </form>
                <Button className='action-button'>Add</Button>
            </div>
        );
    }

    tableHeaderRenderer() {
        return (
            <div className='products-table-header'>
                <div className='header-item column-name'>
                    <span className='header-item-title'>Name</span>
                </div>
                <div className='header-item column-price'>
                    <span className='header-item-title'>Price</span>
                </div>
                <div className='header-item column-actions'>
                    <span className='header-item-title'>Actions</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="products-table">
                {this.tableControlsRenderer()}
                {this.tableHeaderRenderer()}
                <ProductTableContent filterString={this.state.searchInput} />
            </div>
        );
    }
}

export const ProductsTable = connect(
    null,
    dispatch => ({
        loadProducts: () => dispatch(getProducts())
    })
)(ProductsTableInternal);