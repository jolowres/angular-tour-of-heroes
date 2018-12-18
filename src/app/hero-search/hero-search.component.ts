import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service'
import { Hero } from '../classes/hero'
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  search(searchTerm: string): void {
    this.searchTerms.next(searchTerm)
  }

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.heroService.searchHero(term)
      })
    )
  }

}
