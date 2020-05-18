import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../../Primitives';
import { showArrOrEditModal, showDeleteConfirmModal } from '../../../../../Store/Modals';
import { dollarsPresenter } from '../../../../../Utils';

import './ProductRow.scss';

class ProductRowInternal extends Component {
    static propTypes = {
        id: PropTypes.string,
        product: PropTypes.object
    }

    edit = () => this.props.edit(this.props.product);

    delete = () => this.props.delete(this.props.product);

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
                    <Button className='action-button edit' onClick={this.edit}>Edit</Button>
                    <Button className='action-button delete' onClick={this.delete}>Delete</Button>
                </div>
            </div>
        );
    }
}

export const ProductRow = connect(
    (state, props) => ({
        product: state.products.list[props.id]
    }),
    {
        edit: showArrOrEditModal,
        delete: showDeleteConfirmModal
    }
)(ProductRowInternal);