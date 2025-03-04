import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;

  name: string = '';
  job: string = '';
  successMessage: string = '';

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    // No es necesario inicializar nada aquí
  }

  onSubmit(): void {
    if (this.name.trim().length > 0 && this.job.trim().length > 0) {
      // Convertimos la promesa a Observable usando from
      from(Promise.resolve(this.usersService.createUser(this.name, this.job))).subscribe({
        next: () => {
          this.successMessage = `User created successfully!`;
          this.redirectToListUsers();
        },
        error: (err) => {
          console.error('Error creating user:', err);
        },
      });
    }
  }

  /**
   * Este método no se puede modificar
   */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }
}
