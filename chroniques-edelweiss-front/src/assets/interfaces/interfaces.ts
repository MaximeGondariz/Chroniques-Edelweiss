export interface NewUser {
    pseudo: string,
    email: string,
    password: string,
    status: string,
    flowers: number
}

export interface User {
    id: number,
    pseudo: string,
    email: string,
    password: string,
    status: string,
    flowers: number
}

export interface JDR {
    id: number,
    name: string,
    description: string,
    date_prochaine_seance?: Date
}