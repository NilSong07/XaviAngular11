import { Component, OnInit } from '@angular/core';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';


@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.users = response.data;
        } else {
          console.error('Formato de respuesta inesperado:', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  filterUsers(name: string) {
    this.searchTerm = name;

    if (this.searchTerm.length < 3) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.filteredUsers.splice(index, 1);
  }
}
