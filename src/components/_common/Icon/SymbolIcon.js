import React from 'react';
import classnames from 'classnames';

const SymbolIcon = (props) => {
    const classes = classnames(
        props.className,
        'icon'
    );
    return (
        <svg className={classes} aria-hidden="true">
            <use xlinkHref={`#${props.icon}`} />
        </svg>
    )
};


export default SymbolIcon;