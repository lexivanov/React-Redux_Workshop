import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../../Primitives';
import { showModalAction, hideModalAction } from '../../../../../Store/Reducers/Modals';
import { deleteProduct } from '../../../../../Store/Reducers/Products';
import { dollarsPresenter } from '../../../../../Utils';
import { AddOrEditModal, ConfirmModal } from '../../../../Forms';

import './ProductRow.scss';

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
                    <Button className='action-button delete' onClick={() => this.props.delete(this.props.product)}>Delete</Button>
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
        })),
        delete: product => dispatch(showModalAction({
            element: <ConfirmModal
                title={`Delete ${product.name}`}
                question='Are you sure you want to delete this product?'
                onConfirm={async () => {
                    await dispatch(deleteProduct(product.id));
                    dispatch(hideModalAction());
                }}
                onReject={() => dispatch(hideModalAction())}
            />
        }))
    })
)(ProductRowInternal);