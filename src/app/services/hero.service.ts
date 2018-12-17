import { Injectable } from '@angular/core';
import { Hero } from '../classes/hero';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { tap, catchError } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private herosApi = 'api/heroes'

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed ` + error.message)
      return of(result as T)
    }
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.herosApi)
    .pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    )
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetching hero ' + id);
    const url = `${this.herosApi}/${id}`
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero --> ${id}`)),
      catchError(this.handleError<Hero>('getHeroes'))
    )
  }

  saveHero(hero: Hero): Observable<any> {
    return this.http.put(this.herosApi, hero, httpOptions)
    .pipe(
      tap(_ => this.log(`saved hero --> ${hero.id}`)),
      catchError(this.handleError<any>('update hero'))
    )
  }

  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.herosApi, hero, httpOptions)
    .pipe(
      tap((hero: Hero) => this.log(`added hero ----> ${hero.id}`)),
      catchError(this.handleError<any>('adding hero'))
    )
  }

  deleteHero(hero : Hero) {
    const url = `${this.herosApi}/${hero.id}`
    return this.http.delete<Hero>(url, httpOptions)
    .pipe(
      tap(_ => this.log('deleted hero')),
      catchError(this.handleError<any>('deleting hero'))
    )
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) {
  }
}