import React from "react"
import {ErrorMessageType} from "./types"

// Функция валидации формы (используется в AddTodoForm и TodoItem)
export const checkTodoTitle = (e: React.FormEvent<HTMLFormElement> |
                                     React.MouseEvent<HTMLButtonElement>,
                                 title: string) => {
    e.preventDefault()
    if (title.trim().length < 2) {
        return ErrorMessageType.TooShort
    }
    if (title.trim().length > 64) {
        return ErrorMessageType.TooLong
    }
    return ErrorMessageType.Correct
}