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