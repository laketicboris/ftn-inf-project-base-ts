
import { UserService } from "../services/user.service.js";


const userService = new UserService();

document.addEventListener("DOMContentLoaded", () => {
    userService.getAll()
        .then(users => {
            const tbody = document.querySelector("#user-table tbody");
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.birthDate}</td>
                `;
                if(users.length === 0){
                    const row = document.createElement("tr");
                    row.innerHTML = `<td colspan="4">Nema dostupnih korisnika.</td>`;
                    tbody.appendChild(row);
                }
                
            });
        })
        .catch(error => {
            console.error("Greška:", error.status, error.message);
        });
});