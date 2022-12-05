import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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
        .subscribe((heroe) =>
          this.mostrarSnackBar('El héroe ha sido actualizado')
        );
    } else {
      //Crear
      this.heroesService.addHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('El registro se ha creado correctamente');
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'OK!', {
      duration: 2500,
    });
  }
}
