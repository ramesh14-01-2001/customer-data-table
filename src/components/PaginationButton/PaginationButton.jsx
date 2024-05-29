import React from 'react';
import styles from './PaginationButton.module.scss';

const Button = ({label, Icon, position, key, onClick, disabled, active}) => {
    return (
        <button className={active ? styles.activeButtonWrapper : styles.buttonWrapper} key={key} onClick={onClick} disabled={disabled}>
            {position === 'left' && <Icon />}
            {label}
            {position === 'right' && <Icon />}
        </button>
    );
}

export default Button;