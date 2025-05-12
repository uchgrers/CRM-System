export type Todo = {
    title: string,
    isDone: boolean,
    created: string,
    id: number
}

export enum TodosStatus {
    All = 'all',
    Completed = 'completed',
    InWork = 'inWork'
}

export type TodoInfo = {
    all: number,
    inWork: number,
    completed: number
}

export enum ErrorMessageType {
    TooShort = 'Task must contain at least 2 symbols',
    TooLong = 'Maximum task length is 64 symbols',
    Correct = null
}

export type GetTodos = {
    data: Todo[],
    info: TodoInfo,
    meta: {
        totalAmount: number
    }
} | string

export enum ButtonColor {
    Primary = 'button-primary',
    Secondary = 'button-secondary',
    Dangerous = 'danger'
}