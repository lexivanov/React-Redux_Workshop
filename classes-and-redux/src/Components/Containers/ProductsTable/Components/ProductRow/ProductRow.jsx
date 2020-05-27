import React, { useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../../Primitives';
import { showArrOrEditModal, showDeleteConfirmModal } from '../../../../../Store/Modals';
import { dollarsPresenter } from '../../../../../Utils';

import './ProductRow.scss';

export const ProductRowInternal = ({ id }) => {
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.list[id]);

    const { name, price, count } = product;

    const edit = useCallback(() => dispatch(showArrOrEditModal()), [dispatch]);

    const remove = useCallback(() => {
        actionsContainer.current.style.background = 'blue';
        dispatch(showDeleteConfirmModal(product));
    }, [dispatch, product]);

    const actionsContainer = useRef(null);


    const markup = useMemo(() =>
        (<div className='products-table-row'>
            <div className='row-item column-name'>
                <span className='name'>{name}</span>
                <span className='count'>{count}</span>
            </div>
            <div className='row-item column-price'>
                <span className='price'>{dollarsPresenter(price)}</span>
            </div>
            <div className='row-item column-actions' ref={actionsContainer}>
                <Button className='action-button edit' onClick={edit}>Edit</Button>
                <Button className='action-button delete' onClick={remove}>Delete</Button>
            </div>
        </div>), [count, edit, name, price, remove]);

    return markup;

}

ProductRowInternal.propTypes = {
    id: PropTypes.string,
    product: PropTypes.object
}
