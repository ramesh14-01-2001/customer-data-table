import React from 'react';
import styles from './Input.module.scss';

const Input = ({id, placeholder, value, onChange, leftBlock, rightBlock, onFocus, readOnly }) => {
    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                {leftBlock &&
                    <div className={styles.iconClassName}>
                        {leftBlock}
                    </div>
                }
                <input
                    type='input'
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    readOnly={readOnly}
                />
                {rightBlock && <div className={styles.iconClassName}>
                    {rightBlock}
                </div>}
            </div>
        </div>
    );
};

export default Input;