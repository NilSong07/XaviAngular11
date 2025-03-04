import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): any {
    return this.http.get<any>(this.apiUrl).toPromise();
  }

  createUser(name: string, job: string): any {
    return this.http.post<any>(this.apiUrl, { name, job }).toPromise();
  }

  deleteUserForIndex(index: number): any {
    return this.http.delete<any>(`${this.apiUrl}/${index}`).toPromise();
  }
}
