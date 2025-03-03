import { Component, OnInit } from '@angular/core';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';


@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  filterUsers() {
    return this.users.filter(user =>
      user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
