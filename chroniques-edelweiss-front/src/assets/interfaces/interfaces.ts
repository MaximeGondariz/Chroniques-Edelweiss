export interface NewUser {
    pseudo: String,
    email: String,
    password: String,
    role: String,
    flowers: Number
}

export interface User {
    id: Number,
    pseudo: String,
    email: String,
    password: String,
    role: String,
    flowers: Number
}

export interface JDR {
    id: Number,
    name: String,
    description: String,
    date_prochaine_seance?: Date
}