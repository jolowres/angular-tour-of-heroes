import { Component, OnInit } from '@angular/core';
import { Hero } from '../classes/hero'
import { HeroService } from '../services/hero.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []

  getHeroes (): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes()
  }
}
