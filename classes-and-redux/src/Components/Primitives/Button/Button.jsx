import React from 'react';
import PropTypes from 'prop-types';

export const Button = props => {
    const onClickInternal = e => {
        e.stopPropagation();
        props.onClick && props.onClick();
    };

    return (
        <button
            {...props}
            type={props.type || 'submit'}
            onClick={onClickInternal}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
}

