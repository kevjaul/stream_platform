import { ChangeDetectionStrategy,Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { FilmsListComponent } from './films-list/films-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

export interface MenuItem {
  cols: number;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilmsListComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatGridListModule, MatFormFieldModule, MatInputModule,MatSidenavModule, FlexLayoutModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
      .spacer {
        display: flex;
        flex: 1 1 auto;
      }
      .sidenav-menu{
        position: fixed;
        height: 100%;
        width: 20%;
        color: rgb(255,0,0);
        background-color:transparent;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="sidenav.toggle()" fxShow fxHide.gt-sm>
        <mat-icon>menu</mat-icon>
      </button>
      <span>PlatFilm</span>
      <span class="spacer"></span>
      <mat-grid-list cols="4" rowHeight="100%" style="width:60%" fxShow fxHide.lt-md>
        @for (menuitem of menus; track menuitem) {
        <mat-grid-tile
        [colspan]="menuitem.cols"
        [rowspan]=1
        >{{menuitem.text}}</mat-grid-tile>
        }
      </mat-grid-list>
      <span class="spacer"></span>
      <mat-form-field appearance="fill" subscriptSizing="dynamic">
        <mat-label>Search...</mat-label>
        <input matInput placeholder="Jurassic World,..." type="search">
        <button matSuffix mat-icon-button>
          <mat-icon>search</mat-icon>
        </button>
      </mat-form-field>
      <section>
        <div>
          <button mat-fab>
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
      </section>
    </mat-toolbar>
    <mat-sidenav-container fxFlexFill class="sidenav-menu">
      <mat-sidenav #sidenav mode="over" position="start" fxLayout="column">
        <div fxLayout="column">
          @for (menuitem of menus; track menuitem) {
            <a href="#" mat-button
            >{{menuitem.text}}</a>
          }
        </div>
      </mat-sidenav>
    </mat-sidenav-container>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'client';
  menus: MenuItem[] = [
    {text: 'ACCUEIL', cols: 1},
    {text: 'SERIES', cols: 1},
    {text: 'FILMS', cols: 1},
    {text: 'TENDANCES', cols: 1},
  ];
}