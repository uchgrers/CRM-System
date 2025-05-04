import React from 'react'
import s from './ErrorMessage.module.scss'
import {ErrorMessageType} from "../../../assets/types"

type ErrorType = {
    message: ErrorMessageType
}

const ErrorMessage: React.FC<ErrorType> = (props) => {
    return (
        <div className={s.error}>
        <p>
            {props.message}
        </p>
        </div>
    );
};

export default ErrorMessage;