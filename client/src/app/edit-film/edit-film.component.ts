import { Component, OnInit, WritableSignal } from '@angular/core';
import { FilmFormComponent } from '../film-form/film-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../film';
import { FilmService } from '../film.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-film',
  standalone: true,
  imports: [FilmFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Modifier un film</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-film-form
          [initialState]="film()"
          (formSubmitted)="editFilm($event)"
        ></app-film-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})

export class EditFilmComponent implements OnInit {
  film = {} as WritableSignal<Film>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.filmService.getFilm(id!);
    this.film = this.filmService.film$;
  }

  editFilm(film: Film) {
    this.filmService
      .updateFilm(this.film()._id || '', film)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update a film');
          console.error(error);
        },
      });
  }
}
