import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../classes/hero';
import { HeroService } from '../services/hero.service' 

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  getHero() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.herosService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  goBack() {
    this.location.back()
  }

  constructor(
    private herosService: HeroService,
    private route: ActivatedRoute,
    private location:  Location
    ) { }

  ngOnInit() {
    this.getHero()
  }

}
