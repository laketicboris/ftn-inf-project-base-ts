import { UserService } from "./services/user.service.js";

const userService = new UserService();

function renderData(): void {
    userService.getAll()
        .then(users => {
            const table = document.querySelector('table tbody');
            if (!table) {
                console.error('Table body not found');
                return;
            }
            
            for (let i = 0; i < users.length; i++) {
                const newRow = document.createElement('tr');
                
                const cell1 = document.createElement('td');
                cell1.textContent = users[i].korisnickoIme;
                newRow.appendChild(cell1);
                
                const cell2 = document.createElement('td');
                cell2.textContent = users[i].ime;
                newRow.appendChild(cell2);
                
                const cell3 = document.createElement('td');
                cell3.textContent = users[i].prezime;
                newRow.appendChild(cell3);
                
                const cell4 = document.createElement('td');
                
                const birthDate = new Date(users[i].datumRodjenja);
                cell4.textContent = birthDate.toLocaleDateString('sr-RS');
                newRow.appendChild(cell4);
                
                const cell5 = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.style.width = 'auto';
                const userId = users[i].id;
                
                editButton.onclick = function () {
                    window.location.href = `./usersForm/usersForm.html?id=${userId}`;
                };
                cell5.appendChild(editButton);
                newRow.appendChild(cell5);
                
                const cell6 = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.width = 'auto';
                
                deleteButton.onclick = function () {
                    userService.deleteUser(userId.toString())
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error.status, error.message);
                        });
                };
                cell6.appendChild(deleteButton);
                newRow.appendChild(cell6);
                
                table.appendChild(newRow);
            }
        })
        .catch(error => {
            console.error(error.status, error.message);
        });
}
document.addEventListener('DOMContentLoaded', () => {
    renderData();
});
