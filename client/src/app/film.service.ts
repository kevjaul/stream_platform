import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private url = 'http://localhost:5200';
  films$ = signal<Film[]>([]);
  film$ = signal<Film>({} as Film);
 
  constructor(private httpClient: HttpClient) { }

  private refreshFilms() {
    this.httpClient.get<Film[]>(`${this.url}/films`)
      .subscribe(films => {
        this.films$.set(films);
      });
  }

  getFilms() {
    this.refreshFilms();
    return this.films$();
  }

  getFilm(id: string) {
    this.httpClient.get<Film>(`${this.url}/films/${id}`).subscribe(film => {
      this.film$.set(film);
      return this.film$();
    });
  }

  createFilm(film: Film) {
    return this.httpClient.post(`${this.url}/films`, film, { responseType: 'text' });
  }

  updateFilm(id: string, film: Film) {
    return this.httpClient.put(`${this.url}/films/${id}`, film, { responseType: 'text' });
  }

  deleteFilm(id: string) {
    return this.httpClient.delete(`${this.url}/films/${id}`, { responseType: 'text' });
  }
}