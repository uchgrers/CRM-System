import React from 'react'
import s from './Button.module.scss'

type Button = {
    content: JSX.Element | string,
    color: string,
    onClick: () => void
}

const Button: React.FC<Button> = (props) => {
    const handleClick = () => {
        props.onClick()
    }
    return (
        <button className={ s[ props.color ] } onClick={handleClick}>
            {props.content}
        </button>
    );
};

export default Button;