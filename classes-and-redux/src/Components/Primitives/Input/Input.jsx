import React from 'react';
import PropTypes from 'prop-types';

export const Input = props => {
    const onChangeInternal = e =>
        props.onChange && props.onChange(e.target.value);

    const onBlurInternal = e =>
        props.onBlur && props.onBlur(e.target.value);

    return (
        <input
            {...props}
            onBlur={onBlurInternal}
            onChange={onChangeInternal}
        />
    );
};

Input.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string
}


