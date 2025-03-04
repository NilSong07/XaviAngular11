import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';

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

  ngOnInit(): void {}

  get isFormInvalid(): boolean {
    return !this.name.trim() || !this.job.trim();
  }

  onSubmit(): void {
    if (!this.isFormInvalid) {
      this.usersService.createUser(this.name, this.job).subscribe({
        next: (response) => {
          this.successMessage = `User ${response.name} created successfully!`;
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
