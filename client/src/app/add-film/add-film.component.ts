import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmFormComponent } from '../film-form/film-form.component';
import { Film } from '../film';
import { FilmService } from '../film.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [FilmFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Ajouter un Film</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-film-form (formSubmitted)="addFilm($event)">
        </app-film-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})

export class AddFilmComponent {
  constructor(
    private router: Router,
    private filmService: FilmService
  ) {}

  addFilm(film: Film) {
    this.filmService.createFilm(film).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create a film');
        console.error(error);
      },
    });
    this.filmService.getFilms();
  }
}