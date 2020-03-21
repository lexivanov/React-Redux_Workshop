import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts, filterProductIds, applyFilter } from '../../../Store/Reducers/Products';
import { showModalAction } from '../../../Store/Reducers/Modals';
import { Button, Input } from '../../Primitives';
import { AddOrEditModal } from '../../Forms';

import { ProductRow } from './Components';

import './ProductsTable.scss'

class ProductsTableInternal extends Component {
    static propTypes = {
        poructIds: PropTypes.arrayOf(PropTypes.string),
        loadProducts: PropTypes.func,
        applyFilter: PropTypes.func
    }

    componentDidMount() {
        this.props.loadProducts();
    }

    state = {
        searchInput: ''
    }

    onChangeSearchInput = value => this.setState({ searchInput: value || '' });

    onSubmitSearch = e => {
        e.preventDefault();
        this.props.applyFilter(this.state.searchInput);
    }

    tableControlsRenderer() {
        return (
            <div className='products-table-controls'>
                <form
                    className='search-form'
                    onSubmit={this.onSubmitSearch}
                >
                    <Input
                        className='search-input'
                        placeholder='Filter products by name'
                        onChange={this.onChangeSearchInput}
                        value={this.state.searchInput}
                    />
                    <Button
                        className='action-button'
                        type='submit'
                    >
                        Search
                    </Button>
                </form>
                <Button className='action-button' onClick={this.props.add}>Add</Button>
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
                {!!this.props.poructIds.length && <div className="products-table-content">
                    {this.props.poructIds.map(x => (<ProductRow id={x} key={x} />))}
                </div>}
            </div>
        );
    }
}

export const ProductsTable = connect(
    (state, props) => ({
        poructIds: filterProductIds(state, props.filterString)
    }),
    dispatch => ({
        loadProducts: () => dispatch(getProducts()),
        applyFilter: filter => dispatch(applyFilter(filter)),
        add: () => dispatch(showModalAction({
            element: <AddOrEditModal />
        }))
    })
)(ProductsTableInternal);