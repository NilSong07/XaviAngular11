import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response)
    );
  }

  createUser(name: string, job: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, job });
  }

  deleteUserForIndex(index: number) {

  }
}
