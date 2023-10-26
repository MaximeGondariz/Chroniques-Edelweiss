export interface NewUser {
    pseudo: string,
    email: string,
    password: string,
    status: string,
    flowers: number
}

export interface User {
    _id: string,
    pseudo: string,
    email: string,
    password: string,
    status: string,
    flowers: number
}


export interface newJDR {
    name: string,
    description: string,
    date_prochaine_seance?: Date
}
export interface JDR {
    _id: string,
    name: string,
    description: string,
    date_prochaine_seance?: Date
}