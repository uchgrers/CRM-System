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

export type UserRegistration = { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber: string; 
}

export type Register = {
    email: string,
    login: string,
    password: string,
    username: string,
    phoneNumber?: string
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR'

export type Profile = { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  roles: Role[]; 
  phoneNumber: string; 
}