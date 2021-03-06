import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FirebaseConfigs } from '../constants/firebase-configs';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  storePost(title: string, content: string): void {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
        FirebaseConfigs.FIREBASE_URL + '/' + FirebaseConfigs.POSTS_ENDPOINT,
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData: HttpResponse<{ name: string }>) => {
          console.log(responseData);
        },
        (error: any) => {
          this.error.next(error.error.error);
        }
      );
  }

  fetchPosts(): Observable<Post[]> {
    let queryParams = new HttpParams().set('print', 'pretty');
    queryParams = queryParams.append('queryParams', 'Hello Query');

    return this.http
      .get<{ [key: string]: Post }>(
        FirebaseConfigs.FIREBASE_URL + '/' + FirebaseConfigs.POSTS_ENDPOINT,
        {
          headers: new HttpHeaders({
            'Custom-Header': 'Hello World',
          }),
          params: queryParams,
          responseType: 'json',
        }
      )
      .pipe(
        map((responseData: { [key: string]: Post }): Post[] => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError((error: any) => {
          // Non-UI related error handling. E.g. send data to analytics server
          return throwError(error);
        })
      );
  }

  deletePosts(): Observable<object> {
    return this.http
      .delete(
        FirebaseConfigs.FIREBASE_URL + '/' + FirebaseConfigs.POSTS_ENDPOINT,
        {
          observe: 'events',
          responseType: 'text',
        }
      )
      .pipe(
        tap((event: HttpEvent<string>) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
