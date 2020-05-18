import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts, filterProductIds, applyFilter, applySorting } from '../../../Store/Products';
import { showArrOrEditModal } from '../../../Store/Modals';
import { Button, Input } from '../../Primitives';

import { ProductRow } from './Components';

import './ProductsTable.scss'

class ProductsTableInternal extends Component {
    static propTypes = {
        productIds: PropTypes.arrayOf(PropTypes.string),
        sortOptions: PropTypes.object,
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

    onSortClickFactory = fieldName => e => {
        const options = this.props.sortOptions;

        this.props.applySorting({
            field: fieldName,
            isDesc: options.field === fieldName && !options.isDesc
        })
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
        const options = this.props.sortOptions;
        return (
            <div className='products-table-header'>
                <div className='header-item column-name' >
                    <span className='header-item-title'>Name</span>
                    <span className='sort-button' onClick={this.onSortClickFactory('name')}>
                        {options.field === 'name' && options.isDesc ? '🔺' : '🔻'}
                    </span>
                </div>
                <div className='header-item column-price' >
                    <span className='header-item-title'>Price</span>
                    <span className='sort-button' onClick={this.onSortClickFactory('price')}>
                        {options.field === 'price' && options.isDesc ? '🔺' : '🔻'}
                    </span>
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
                {!!this.props.productIds.length && <div className="products-table-content">
                    {this.props.productIds.map(x => (<ProductRow id={x} key={x} />))}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    productIds: filterProductIds(state, ownProps.filterString),
    sortOptions: state.products.sortOptions
});

const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(getProducts()),
    applyFilter: filter => dispatch(applyFilter(filter)),
    applySorting: options => dispatch(applySorting(options)),
    add: () => dispatch(showArrOrEditModal())
});

export const ProductsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTableInternal);