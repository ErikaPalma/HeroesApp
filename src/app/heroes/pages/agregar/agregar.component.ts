import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe;

  constructor(private heroesService: HeroesService, private router: Router) {
    this.heroe = {
      superhero: '',
      alter_ego: '',
      characters: '',
      first_appearance: '',
      publisher: Publisher.DCComics,
      alt_img: '',
    };
  }

  ngOnInit(): void {}

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    this.heroesService
      .addHeroe(this.heroe)
      .subscribe((heroe) => this.router.navigate(['/heroes', heroe.id]));
  }
}
