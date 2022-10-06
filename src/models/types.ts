export interface IUser {
    email: string | null;
    password: string | null;
}

export interface IUsers {
    name: string | null;
    email: string | null;
    company: string | null;
    website: string | null;
}

export interface IPost {
    company: string | null;
    name: string | null;
    userId?: number | null;
    id?: string | null;
    title: string | null;
    body?: string | null;
}