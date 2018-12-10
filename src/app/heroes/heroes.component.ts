import { Component, OnInit } from '@angular/core';
import { Hero } from '../classes/hero'
import { HEROES } from '../mock-heroes'
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`Selected ${this.selectedHero.name}`)
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService) {
   }

  ngOnInit() {
    this.getHeroes()
  }

}
