import React from 'react';
import PropTypes from 'prop-types';

export const Button = props => {
    const onClickInternal = e => {
        e.stopPropagation();
        e.preventDefault();
        props.onClick && props.onClick();
    };

    return (
        <Button
            {...props}
            type={props.type || 'submit'}
            onClick={onClickInternal}
        />
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
}

