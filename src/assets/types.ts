export type Todo = {
    title: string,
    isDone: boolean,
    created: string,
    id: number
}

export type Todos = Todo[]

export type TodosStatus = 'all' | 'completed' | 'inWork'

export type TodosCountObjectType = {
    all: number,
    inWork: number,
    completed: number
}

export type ErrorMessageType = 'Task must contain at least 2 symbols' |
    'Maximum task length is 64 symbols' | null

export type TypeOfUpdate = 'check' | 'title'