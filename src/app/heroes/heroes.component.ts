import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Hero } from '../classes/hero'
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.router.navigate(['hero-detail', hero.id])
    this.messageService.add(`Selected--> ${hero.id}`)
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string): void {
    name = name.trim()
    if (!name) {
      return
    }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero).subscribe()
  }

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService,
    private router: Router) {
   }

  ngOnInit() {
    this.getHeroes()
  }

}
