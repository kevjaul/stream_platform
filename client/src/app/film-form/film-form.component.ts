import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Film } from '../film';

@Component({
  selector: 'app-film-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .film-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="film-form"
      autocomplete="off"
      [formGroup]="filmForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Nom</mat-label>
        <input matInput placeholder="Nom" formControlName="name" required />
        @if (name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Date de sortie</mat-label>
        <input
          matInput
          placeholder="Date de sortie"
          formControlName="release_date"
          required
        />
        @if (release_date.invalid) {
        <mat-error>Release date temp</mat-error>
        }
      </mat-form-field>

      <mat-radio-group formControlName="type" aria-label="Choisir une option">
        <mat-radio-button name="type" value="horreur" required>
          Horreur
        </mat-radio-button>
        <mat-radio-button name="type" value="action">
          Action
        </mat-radio-button>
        <mat-radio-button name="type" value="comedie">
          Comédie
        </mat-radio-button>
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="filmForm.invalid"
      >
        Ajouter
      </button>
    </form>
  `,
})

export class FilmFormComponent {
  initialState = input<Film>();

  @Output()
  formValuesChanged = new EventEmitter<Film>();

  @Output()
  formSubmitted = new EventEmitter<Film>();

  filmForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    release_date: ['', [Validators.required, Validators.minLength(5)]],
    type: ['action', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.filmForm.setValue({
        name: this.initialState()?.name || '',
        release_date: this.initialState()?.release_date || '',
        type: this.initialState()?.type || 'action',
      });
    });
  }

  get name() {
    return this.filmForm.get('name')!;
  }
  get release_date() {
    return this.filmForm.get('release_date')!;
  }
  get type() {
    return this.filmForm.get('type')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.filmForm.value as Film);
  }
}