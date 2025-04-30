import React from 'react'
import s from './ErrorMessage.module.scss'
import {ErrorMessageType} from "../../../assets/types"

type ErrorType = {
    message: ErrorMessageType
}

const ErrorMessage: React.FC<ErrorType> = (props) => {
    return (
        <p className={s.error}>
            {props.message}
        </p>
    );
};

export default ErrorMessage;