import React from 'react';
import styles from './DropDown.module.scss';

const DropDown = ({ options, selectedOption, onChange }) => {

    return (
        <select className={styles.dropDown} value={selectedOption} onChange={onChange}>
            {options.map((option, index) => {
                return (
                    <option value={option} key={index}>{option}</option>
                );
            })}
        </select>
    );
}

export default DropDown;