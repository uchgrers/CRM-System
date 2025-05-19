import React from 'react'
import s from './Button.module.scss'
import {ButtonColor} from "../uiTypes"

type Button = {
    content: React.ReactNode | string,
    color: ButtonColor,
    onClick?: () => void,
    type?: string
}

const Button: React.FC<Button> = (props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick()
        }
    }
    return (
        <button className={s[props.color]} onClick={handleClick}>
            {props.content}
        </button>
    );
};

export default Button;