import { Injectable } from '@angular/core';
import { Hero } from '../classes/hero';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private herosApi = 'api/heroes'

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.herosApi)
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetching hero ' + id);
    return of(new Hero())
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) {
  }
}