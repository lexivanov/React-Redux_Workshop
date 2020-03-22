import React from 'react';

import { Button } from '../../Primitives';

import "./ConfirmModal.scss"

export const ConfirmModal = props => (
    <div className='confirm-modal'>
        <h3 className='confirm-modal-title'>{props.title}</h3>
        {props.question && <p className='confirm-modal-question'>{props.question}</p>}
        <div className='confirm-modal-controls'>
            <Button className='confirm-modal-yes' onClick={props.onConfirm}>Yes</Button>
            <Button className='confirm-modal-no' onClick={props.onReject}>No</Button>
        </div>
    </div>
);
