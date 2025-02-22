import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Post } from '../../../models/Post'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  queryTerm(term: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/search', { params: { term } })
  }

  queryLabel(labelID: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/getPostsByLabel', { params: { id: labelID } })
  }

  queryAuthor(authorID: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/getPostsByAuthor', { params: { id: authorID } })
  }
}
