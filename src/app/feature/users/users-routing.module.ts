import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './home-user/home-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { TokenGuard } from '@core/guard/token/token.guard';
import { LoginComponent } from '@feature/login/login/login.component';

const routes: Routes = [
  { path: 'list', component: ListUsersComponent, canActivate: [TokenGuard] },
  { path: 'create', component: CreateUserComponent, canActivate: [TokenGuard] },
  { path: '', component: HomeUserComponent, canActivate: [TokenGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
