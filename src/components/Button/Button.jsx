import React from "react";
import styles from "./Button.module.scss";

const Button = ({ label, Icon, position, onClick, disabled, active }) => {

    return (
        <button className={active ? styles.activeButtonWrapper : styles.buttonWrapper} onClick={onClick} disabled={disabled}>
            {position === 'left' && <Icon />}
            {label}
            {position === 'right' && <Icon />}
        </button>
    );
}

export default Button;