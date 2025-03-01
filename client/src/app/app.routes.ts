import { Routes } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';

export const routes: Routes = [
  { path: '', component: FilmsListComponent, title: 'Films List' },
  { path: 'new', component: AddFilmComponent },
  { path: 'edit/:id', component: EditFilmComponent },
];