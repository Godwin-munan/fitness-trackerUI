import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { AppError } from '@core/error/app-error';
import { BadRequestError } from '@core/error/bad-request-error';
import { NotFoundError } from '@core/error/not-found-error';
import { ApiResponse } from '@core/utils/api-response';
import { environment } from '@env/environment';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private domain: string = environment.domain;
  private http = inject(HttpClient);
  

  constructor() { }

  get<T>(api: string): Observable<ApiResponse<T>> {
    return this.http.get(`${this.domain}${api}`).pipe(
      map(response => response as ApiResponse<T>),
      catchError(this.handleError)
    );
  }

  getById<T>(id: number ,api: string) : Observable<ApiResponse<T>> {
    return this.http.get(`${this.domain}${api}${id}`).pipe(
      map(reponse => reponse as ApiResponse<T>),
      catchError(this.handleError)
    );
  }

  getByCode<T>(code: string ,api: string) : Observable<ApiResponse<T>> {
    return this.http.get(`${this.domain}${api}${code}`).pipe(
      map(reponse => reponse as ApiResponse<T>),
      catchError(this.handleError)
    );
  }

  getPage<T>(api: string, field: string, page: number, size: number) : Observable<ApiResponse<T>> {
    return this.http.get(`${this.domain}${api}${field}/${page}/${size}`).pipe(
      map(reponse => reponse as ApiResponse<T>),
      catchError(this.handleError)
    );
  }

  add<T>(api: string, data: any ): Observable<ApiResponse<T>> {
    return this.http.post(`${this.domain}${api}`, data).pipe(
      map(response => {
        return response as ApiResponse<T>}
        ),
      catchError(this.handleError)
    );
  }

  addById<T>(api: string, id: number, data: any ): Observable<ApiResponse<T>> {
    return this.http.post(`${this.domain}${api}${id}`, data).pipe(
      map(reponse => reponse as ApiResponse<T>),
      catchError(this.handleError)
    );
  }

  delete(api: string, id: number): Observable<ApiResponse<any>> {
    return this.http.delete(`${this.domain}${api}${id}`).pipe(
      map(reponse => reponse as ApiResponse<any>),
      catchError(this.handleError)
    )
  }

  update<T>(api: string, data: any): Observable<ApiResponse<T>>{
    return this.http.put(`${this.domain}${api}`, data).pipe(
      map(response => response as ApiResponse<T>),
      catchError(this.handleError)
    )
  }

  private handleError(error: Response){
    if(error.status === 404)

      return throwError(() => new NotFoundError(error))
  
    if(error.status === 400){

      return throwError(() => new BadRequestError(error));
    }
      
      
    return throwError(() => new AppError(error));
    }
}

