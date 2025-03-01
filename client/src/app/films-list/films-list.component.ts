import { Component, OnInit, WritableSignal } from '@angular/core';
import { Film } from '../film';
import { FilmService } from '../film.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-films-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Films List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="films$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-position">
            <th mat-header-cell *matHeaderCellDef>Date de sortie</th>
            <td mat-cell *matCellDef="let element">{{ element.release_date }}</td>
          </ng-container>
          <ng-container matColumnDef="col-level">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteFilm(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add New Films
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})

export class FilmsListComponent implements OnInit {
  films$ = {} as WritableSignal<Film[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-position',
    'col-level',
    'col-action',
  ];

  constructor(private filmsService: FilmService) {}

  ngOnInit() {
    this.fetchFilms();
  }

  deleteFilm(id: string): void {
    this.filmsService.deleteFilm(id).subscribe({
      next: () => this.fetchFilms(),
    });
  }

  private fetchFilms(): void {
    this.films$ = this.filmsService.films$;
    this.filmsService.getFilms();
  }
}