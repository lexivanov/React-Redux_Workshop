import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModalActionCreator, selectLastModal } from '../../../Store/Modals';

import './ModalContainer.scss';

class ModalContainerInternal extends Component {
    static propTypes = {
        modalData: PropTypes.shape({
            title: PropTypes.string,
            element: PropTypes.element
        }),
        closeModal: PropTypes.func
    }

    modalRenderer = () => (
        <>
            <div className='global-overlay' />
            <div className='modal-wrapper'>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <span className="modal-title text-ellipsis">{this.props.modalData.title || ''}</span>
                        <span className="modal-close" onClick={this.props.closeModal}>X</span>
                    </div>
                    <div className='modal-content'>{this.props.modalData.element}</div>
                    <div className='modal-footer'></div>
                </div>
            </div>
        </>
    )

    render() {
        return this.props.modalData
            ? ReactDOM.createPortal(this.modalRenderer(), document.body)
            : null;
    }
}

export const ModalContainer = connect(
    state => ({
        modalData: selectLastModal(state)
    }),
    {
        closeModal: hideModalActionCreator
    }
)(ModalContainerInternal);