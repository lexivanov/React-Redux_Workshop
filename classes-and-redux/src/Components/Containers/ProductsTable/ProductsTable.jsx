import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts, filterProductIds, applyFilter, applySorting } from '../../../Store/Products';
import { showArrOrEditModal } from '../../../Store/Modals';
import { Button, Input } from '../../Primitives';

import { ProductRowInternal } from './Components';

import './ProductsTable.scss'

export const ProductsTableInternal = () => {
    const dispatch = useDispatch();
    const [searchInput, onChangeSearchInput] = useState('');

    const productIds = useSelector((state) => filterProductIds(state));
    const sortOptions = useSelector((state => state.products.sortOptions));

    useEffect(() =>
        dispatch(getProducts()), [dispatch]
    );

    const onSubmitSearch = useCallback((e) => {
        e.preventDefault();
        dispatch(applyFilter(searchInput));
    }, [dispatch, searchInput]);

    const onSortClickFactory = useCallback((fieldName) => e => {
        dispatch(
            applySorting({
                field: fieldName,
                isDesc: sortOptions.field === fieldName && !sortOptions.isDesc
            }));
    }, [dispatch, sortOptions.field, sortOptions.isDesc]);

    const add = useCallback(() => dispatch(showArrOrEditModal()), [dispatch]);

    const tableControls = useMemo(() =>
        (<div className='products-table-controls'>
            <form
                className='search-form'
                onSubmit={onSubmitSearch}
            >
                <Input
                    className='search-input'
                    placeholder='Filter products by name'
                    onChange={onChangeSearchInput}
                    value={searchInput}
                />
                <Button
                    className='action-button'
                    type='submit'
                >
                    Search
                    </Button>
            </form>
            <Button className='action-button' onClick={add}>Add</Button>
        </div>
        ), [add, searchInput, onSubmitSearch, onChangeSearchInput]);

    const tableHeader = useMemo(() =>
        (<div className='products-table-header'>
            <div className='header-item column-name' >
                <span className='header-item-title'>Name</span>
                <span className='sort-button' onClick={onSortClickFactory('name')}>
                    {sortOptions.field === 'name' && sortOptions.isDesc ? '🔺' : '🔻'}
                </span>
            </div>
            <div className='header-item column-price' >
                <span className='header-item-title'>Price</span>
                <span className='sort-button' onClick={onSortClickFactory('price')}>
                    {sortOptions.field === 'price' && sortOptions.isDesc ? '🔺' : '🔻'}
                </span>
            </div>
            <div className='header-item column-actions'>
                <span className='header-item-title'>Actions</span>
            </div>
        </div>), [onSortClickFactory, sortOptions.field, sortOptions.isDesc]);

    const markup = useMemo(() => (
        <div className="products-table">
            {tableControls}
            {tableHeader}
            {!!productIds.length && <div className="products-table-content">
                {productIds.map(x => (<ProductRowInternal id={x} key={x} />))}
            </div>}
        </div>
    ), [productIds, tableControls, tableHeader]);

    return markup;
}

ProductsTableInternal.propTypes = {
    productIds: PropTypes.arrayOf(PropTypes.string),
    sortOptions: PropTypes.object,
    loadProducts: PropTypes.func,
    applyFilter: PropTypes.func
}