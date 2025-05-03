import React from "react"
import {ErrorMessageType} from "./types"

// Функция присваивает ошибке, связанной с заполнением инпута, значение null
// и позволяет заполнять поле ввода (используется в двух местах: AddTodoForm и TodoItem
export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,
                                  setError: ((error: ErrorMessageType) => void),
                                  setTitle: (title: string) => void
) => {
    setError(null)
    setTitle(e.target.value)
}

// Функция валидации формы (также используется в AddTodoForm и TodoItem)
export const handleFormSubmit = (e: React.FormEvent<HTMLFormElement> |
                                     React.MouseEvent<HTMLButtonElement>,
                                 title: string,
                                 setError: ((error: ErrorMessageType) => void),
) => {
    e.preventDefault()
    if (title.trim().length < 2) {
        setError('Task must contain at least 2 symbols')
        return false
    }
    if (title.trim().length > 64) {
        setError('Maximum task length is 64 symbols')
        return false
    }
    return true
}