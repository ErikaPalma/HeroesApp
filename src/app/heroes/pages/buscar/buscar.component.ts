import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string;
  heroes: Heroe[];
  heroeSeleccionado!: Heroe;

  constructor(private heroesService: HeroesService) {
    this.termino = '';
    this.heroes = [];
  }

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService
      .getHeroeId(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
