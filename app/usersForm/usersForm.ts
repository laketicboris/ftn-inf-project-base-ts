import { UserFormData } from "../models/userFormData.model.js";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

function initializeForm(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (id) {
        userService.getById(id)
            .then(user => {
                (document.querySelector('#username') as HTMLInputElement).value = user.korisnickoIme;
                (document.querySelector('#firstName') as HTMLInputElement).value = user.ime;
                (document.querySelector('#lastName') as HTMLInputElement).value = user.prezime;
                (document.querySelector('#birthDate') as HTMLInputElement).value = user.datumRodjenja.split('T')[0];
            })
            .catch(error => {
                console.error(error.status, error.message);
                alert(`Failed to load user: ${error.message}`);
            });
    }
}

function submit(): void {
    const username = (document.querySelector('#username') as HTMLInputElement).value;
    const firstName = (document.querySelector('#firstName') as HTMLInputElement).value;
    const lastName = (document.querySelector('#lastName') as HTMLInputElement).value;
    const birthDate = (document.querySelector('#birthDate') as HTMLInputElement).value;

    if (!username || !firstName || !lastName || !birthDate) {
        alert("All fields are required!");
        return;
    }

    const formData: UserFormData = { 
    korisnickoIme: username, 
    ime: firstName, 
    prezime: lastName, 
    datumRodjenja: birthDate 
};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (id) {
        userService.update(id, formData)
            .then(() => {
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error(error.status, error.message);
                alert(`Failed to update user: ${error.message}`);
            });
    } else {
        userService.add(formData)
            .then(() => {
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error(error.status, error.message);
                alert(`Failed to add user: ${error.message}`);
            });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeForm();
    const submitButton = document.querySelector("#submit");
    if (submitButton) {
        submitButton.addEventListener("click", submit);
    }
});