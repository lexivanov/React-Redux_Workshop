import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProductRow } from '../ProductRow/ProductRow';

class ProductTableContentInternal extends Component {
    static propTypes = {
        filterString: PropTypes.string
    }

    render() {
        return (
            <>
                {!!this.props.poructIds.length && <div className="products-table-content">
                    {this.props.poructIds.map(x => (<ProductRow id={x} key={x} />))}
                </div>}
            </>
        );
    }
}

const filterProductIds = (state, subString) => {
    const productsMap = state.products.list;
    return state.products.ids.filter(x => productsMap.get(x).name.toLowerCase().includes(subString.toLowerCase()));
}

export const ProductTableContent = connect(
    (state, props) => ({
        poructIds: filterProductIds(state, props.filterString)
    }),
)(ProductTableContentInternal);