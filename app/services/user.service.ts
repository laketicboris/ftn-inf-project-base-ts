import { User } from "../models/user.model.js";
import { UserFormData } from "../models/userFormData.model.js";

export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:3891/api/korisnik';

    }

    // Dohvatanje svih korisnika
    getAll(): Promise<User[]> {
    return fetch(this.apiUrl)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    throw { status: response.status, message: errorMessage };
                });
            }
            return response.json();
        })
        .then((responseJson) => {
            return responseJson.data;
        })
        .catch(error => {
            console.error('Error:', error.status);
            throw error;
        });
}


    // Dohvatanje korisnika po ID-u
    getById(id: string): Promise<User> {
        return fetch(`${this.apiUrl}/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage };
                    });
                }
                return response.json();
            })
            .then((user: User) => {
                return user;
            })
            .catch(error => {
                console.error('Error:', error.status);
                throw error;
            });
    }

    // Dodavanje novog korisnika
    add(formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage };
                    });
                }
                return response.json();
            })
            .then((user: User) => {
                return user;
            })
            .catch(error => {
                console.error('Error:', error.status);
                throw error;
            });
    }

    // Ažuriranje korisnika
    update(id: string, formData: UserFormData): Promise<User> {
        return fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage };
                    });
                }
                return response.json();
            })
            .then((user: User) => {
                return user;
            })
            .catch(error => {
                console.error('Error:', error.status);
                throw error;
            });
    }

    // Brisanje korisnika
    deleteUser(userId: string): Promise<void> {
        return fetch(`${this.apiUrl}/${userId}`, { 
            method: 'DELETE' 
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage };
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error.status);
                throw error;
            });
    }
}