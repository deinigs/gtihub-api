import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

const apiUrl = "https://api.github.com";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  profile(username: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/users/${username}`)
      .pipe(
        retry(2),
        tap(result => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
}
