import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `,
  ],
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

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.heroe = {
      superhero: '',
      alter_ego: '',
      characters: '',
      first_appearance: '',
      publisher: Publisher.DCComics,
      alt_img: '',
    };
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //actualizar
      this.heroesService
        .updateHeroe(this.heroe)
        .subscribe((heroe) => console.log('Actualizando', heroe));
    } else {
      //Crear
      this.heroesService
        .addHeroe(this.heroe)
        .subscribe((heroe) =>
          this.router.navigate(['/heroes/editar', heroe.id])
        );
    }
  }
}
