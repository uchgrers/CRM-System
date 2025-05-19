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

export type MetaResponse<T, U> = {
    data: T[],
    info: U
}