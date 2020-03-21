import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../../Primitives';
import { showModalAction } from '../../../../../Store/Reducers/Modals';
import { dollarsPresenter } from '../../../../../Utils';

import './ProductRow.scss';
import { AddOrEditModal } from '../../../../Forms';

class ProductRowInternal extends Component {
    static propTypes = {
        id: PropTypes.string,
        product: PropTypes.object
    }

    render() {
        const { name, price, count } = this.props.product;
        return (
            <div className='products-table-row'>
                <div className='row-item column-name'>
                    <span className='name'>{name}</span>
                    <span className='count'>{count}</span>
                </div>
                <div className='row-item column-price'>
                    <span className='price'>{dollarsPresenter(price)}</span>
                </div>
                <div className='row-item column-actions'>
                    <Button className='action-button edit' onClick={() => this.props.edit(this.props.product)}>Edit</Button>
                    <Button className='action-button delete'>Delete</Button>
                </div>
            </div>
        );
    }
}

export const ProductRow = connect(
    (state, props) => ({
        product: state.products.list.get(props.id)
    }),
    dispatch => ({
        edit: product => dispatch(showModalAction({
            element: <AddOrEditModal product={product} />
        }))
    })
)(ProductRowInternal);