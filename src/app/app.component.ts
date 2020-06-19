import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take,map, catchError, tap } from 'rxjs/operators';

interface user {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: number,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'git-training';
  users$: Observable<user[]>;

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    const tot = this.http.get<user[]>("https://api.github.com/users?per_page=10")
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );

    this.users$ = tot;
  }

  private handleError(err: HttpErrorResponse) {
 
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;
    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}


}
