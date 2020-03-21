import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deepClone, dollarsPresenter } from '../../../Utils';
import { Input, Button } from '../../Primitives';
import { ProductsDataService } from '../../../Services/ProductsData.service';

import { addProduct, editProduct } from '../../../Store/Reducers/Products';

import './EditProductModal.scss';
import { hideModalAction } from '../../../Store/Reducers/Modals';

const emptyDelivery = {
    country: null,
    city: []
};

const emptyProduct = {
    name: '',
    email: '',
    count: '',
    price: '',
    delivery: emptyDelivery
}

export class AddOrEditModalInternal extends Component {
    static propTypes = {
        product: PropTypes.object
    };

    state = {
        product: this.props.product ? deepClone(this.props.product) : emptyProduct,
        deliveryMode: this.props.product && this.props.product.delivery.city && this.props.product.delivery.city.length ? 'city' : '',
        presentAsDollar: true
    };

    onChangeStringFieldFactory = fieldName => value => this.setState({ product: { ...this.state.product, [fieldName]: value } });

    onChangeNumberFieldFactory = fieldName => value => {
        (!value || !(/[^\d]/g.test(value))) && this.setState({ product: { ...this.state.product, [fieldName]: value ? +value : '' } })
    };

    onChangeDecimalFieldFactory = fieldName => value => {
        const match = value.match(/\d+(\.\d{0,2})?/g);
        ((match && match[0].length === value.length) || !value) && this.setState({ product: { ...this.state.product, [fieldName]: value ? value : '' } })
    };

    onChangeCountry = value => this.setState({ product: { ...this.state.product, delivery: { country: value, city: [] } } });

    onChangeCity = value => {
        const curCity = new Set(this.state.product.delivery.city || []);

        curCity.has(value) ? curCity.add(value) : curCity.delete(value);

        this.setState({
            product: {
                ...this.state.product,
                delivery: {
                    ...this.state.product.delivery,
                    city: Array.from(curCity)
                }
            }
        });
    }

    onChangeCity = value => {
        const curCity = new Set(this.state.product.delivery.city || []);

        curCity.has(value) ? curCity.delete(value) : curCity.add(value);

        this.setState({
            product: {
                ...this.state.product,
                delivery: {
                    ...this.state.product.delivery,
                    city: Array.from(curCity)
                }
            }
        });
    }

    onSelectAllClick = value => {
        const deliverySetup = ProductsDataService.deliverySetup;
        const delivery = this.state.product.delivery;
        const allChecked = delivery.city && delivery.city.length === deliverySetup.cities[delivery.country].length;

        this.setState({
            product: {
                ...this.state.product,
                delivery: {
                    ...delivery,
                    city: allChecked ? [] : deliverySetup.cities[delivery.country]
                }
            }
        });
    }

    onChangeDeliveryMode = e => {
        const delivery = this.state.product.delivery;

        this.setState({ deliveryMode: e.target.value, product: { ...this.state.product, delivery: !e.target.value ? emptyDelivery : delivery } })
    };


    onSubmitForm = async e => {
        e.preventDefault();
        const product = { ...this.state.product };
        product.delivery.city && !product.delivery.city.length && (product.delivery.city = null)
        if (this.state.product.id) {
            await this.props.editProduct(product);
        } else {
            await this.props.addProduct(product);
        }

        this.props.close();
    };

    countrySelectorRenderer = countries => {
        const { delivery } = this.state.product;
        return (
            <div className='edit-product-form-country'>
                {
                    countries.map(x => (
                        <label
                            key={x}
                            className='form-country-label'
                        >
                            <Input
                                className='form-country-radio'
                                type="radio"
                                value={x}
                                checked={delivery.country === x}
                                onChange={this.onChangeCountry}
                            />
                            <span className='form-country-name'>{x}</span>
                        </label>
                    ))
                }
            </div>
        )
    }

    citySelectorRenderer = cities => {
        const { delivery } = this.state.product;
        const allChecked = delivery.city && delivery.city.length === cities.length;

        return (
            <div className='edit-product-form-city'>
                <label className='form-city-label all'>
                    <Input
                        className='form-city-checkbox'
                        type="checkbox"
                        value={'all'}
                        checked={allChecked}
                        onChange={this.onSelectAllClick}
                    />
                    <span className='form-city-name'>Select all</span>
                </label>
                {
                    cities.map(x => (
                        <label
                            key={x}
                            className='form-city-label'
                        >
                            <Input
                                className='form-city-checkbox'
                                type="checkbox"
                                value={x}
                                checked={delivery.city && delivery.city.includes(x)}
                                onChange={this.onChangeCity}
                            />
                            <span className='form-city-name'>{x}</span>
                        </label>
                    ))
                }
            </div>
        )
    }

    deliveryControlRenderer = () => {
        const deliverySetup = ProductsDataService.deliverySetup;
        const mode = this.state.deliveryMode;
        const { delivery } = this.state.product;

        return (
            <div className='edit-product-form-delivery'>
                <select
                    className='edit-product-form-selector'
                    value={mode}
                    onChange={this.onChangeDeliveryMode}
                >
                    <option value={''}>None</option>
                    <option value='country'>Country</option>
                    {delivery.country && <option value='city'>City</option>}
                </select>
                {mode === 'country' && this.countrySelectorRenderer(deliverySetup.countries)}
                {mode === 'city' && this.citySelectorRenderer(deliverySetup.cities[delivery.country])}
            </div>
        )
    }

    render() {
        const { product } = this.state;

        return (
            <form className='edit-product-form' onSubmit={this.onSubmitForm}>
                <label className='edit-product-form-group'>
                    <div className='form-group-title'>Name:</div>
                    <Input
                        className='edit-product-form-input'
                        value={product.name}
                        onChange={this.onChangeStringFieldFactory('name')}
                    />
                </label>
                <label className='edit-product-form-group'>
                    <div className='form-group-title'>Email:</div>
                    <Input
                        type='email'
                        className='edit-product-form-input'
                        value={product.email}
                        onChange={this.onChangeStringFieldFactory('email')}
                    />
                </label>
                <label className='edit-product-form-group'>
                    <div className='form-group-title'>Count:</div>
                    <Input
                        className='edit-product-form-input'
                        value={product.count + ''}
                        onChange={this.onChangeNumberFieldFactory('count')}
                    />
                </label>
                <label className='edit-product-form-group'>
                    <div className='form-group-title'>Price:</div>
                    <Input
                        className='edit-product-form-input'
                        value={this.state.presentAsDollar && product.price ? dollarsPresenter(product.price) : product.price + ''}
                        onChange={this.onChangeDecimalFieldFactory('price')}
                        onFocus={() => this.setState({ presentAsDollar: false })}
                        onBlur={() => this.setState({
                            presentAsDollar: true,
                            product: {
                                ...this.state.product,
                                price: this.state.product.price && +this.state.product.price
                            }
                        })}
                    />
                </label>
                {this.deliveryControlRenderer()}
                <Button className='edit-product-form-submit'>{product.id ? "Update" : "Add"}</Button>
            </form>
        );
    }
}

export const AddOrEditModal = connect(
    null,
    dispatch => ({
        addProduct: async product => await dispatch(addProduct(product)),
        editProduct: async product => await dispatch(editProduct(product)),
        close: () => dispatch(hideModalAction()),
    })
)(AddOrEditModalInternal);