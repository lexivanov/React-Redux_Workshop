import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductRow } from './Components/ProductRow/ProductRow';

import './ProductsTable.scss'

class ProductsTableInternal extends Component {
    static propTypes = {
        poructIds: PropTypes.arrayOf(PropTypes.string)
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
                {this.tableHeaderRenderer()}
                {!!this.props.poructIds.length && <div className="products-table-content">
                    {this.props.poructIds.map(x => (<ProductRow id={x} key={x} />))}
                </div>}
            </div>
        );
    }
}

export const ProductsTable = connect(
    state => ({
        poructIds: state.products.ids
    })
)(ProductsTableInternal);