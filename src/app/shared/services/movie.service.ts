import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, throwError} from 'rxjs';
import {IMovie, IPaginatedResponse} from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  getMovies(page: number = 1, perPage: number = 5) {
    const params = new HttpParams()
      .set('_page', page)
      .set('_per_page', perPage)
      .set('_sort', 'numericId')
      .set('_order', 'asc');

    return this.http.get<any>(`${this.apiUrl}/movies`, {observe: 'response', params}).pipe(
      map(response => {
        const body = response.body;
        const moviesArray = Array.isArray(body) ? body : body?.data || [];
        const total = body?.items || moviesArray.length;
        const totalPages = Math.ceil(total / perPage);
        const currentPage = page;

        return {
          first: 1,
          prev: currentPage > 1 ? currentPage - 1 : null,
          next: currentPage < totalPages ? currentPage + 1 : null,
          last: totalPages,
          pages: totalPages,
          items: total,
          data: moviesArray
        };
      })
    );

  }

  searchMovies(query: string): Observable<IMovie[]> {
    if (!query) return of([]);
    const params = new HttpParams().set('title_like', query);
    return this.http.get<IMovie[]>(`${this.apiUrl}/movies`, { params }).pipe(
      map(movies =>
        movies.filter(movie =>
          movie.title.toLowerCase().startsWith(query.toLowerCase())
        )
      ),
      catchError(this.handleError)
    );
  }


  setSearch(query: string) {
    this.searchSubject.next(query);
  }

  private handleError(error: any): Observable<never> {
    console.error('Произошла ошибка:', error);

    let errorMessage = 'Произошла ошибка при загрузке данных';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      errorMessage = `Код ошибки: ${error.status}\nСообщение: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
