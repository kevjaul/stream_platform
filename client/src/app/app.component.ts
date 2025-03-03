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
      .navbar-menu-buttons{
        width:inherit;
        height:inherit;
        background-color:transparent !important;
        box-sizing: border-box;
        color: white;
        font-weight: bold;
        border-radius:0;
      }
      .navbar-menu-buttons:hover{
        color:red;
        border-top: 2px solid red;
        opacity: 1;
      }
      .navbar-menu-buttons-group{
        width:40%;
      }
      .navbar-account-button{
        background-color:rgb(255,0,0);
        height:inherit;
        border-radius:0;
      }
    `,
  ],
  template: `
    <mat-toolbar style="padding-right:0">
      <button mat-icon-button (click)="sidenav.toggle()" fxShow fxHide.gt-sm>
        <mat-icon class="white-icon">menu</mat-icon>
      </button>
      <div style="display:flex;align-items: center;" fxHide.lt-md>
        <img src="./logos/website_full_logo.png" width="190em" height="45em" style="position:absolute">
        <a style="width:9.5em; height:2.5em; position:relative;" href="#"></a>
      </div>
      <div style="display:flex;align-items: center;" fxShow fxHide.gt-sm>
        <img src="./logos/website_logo.png" width="50em" height="45em" style="position:absolute">
        <a style="width:2.5em; height:2.5em; position:relative;" href="#"></a>
      </div>
      <span class="spacer"></span>
      <mat-grid-list class="navbar-menu-buttons-group" cols="4" rowHeight="100%" fxShow fxHide.lt-md>
        @for (menuitem of menus; track menuitem) {
        <mat-grid-tile
        [colspan]="menuitem.cols"
        [rowspan]=1
        ><button class="navbar-menu-buttons" mat-flat-button >{{menuitem.text}}</button></mat-grid-tile>
        }
      </mat-grid-list>
      <span class="spacer"></span>
      <mat-form-field appearance="fill" subscriptSizing="dynamic" style="height:inherit">
        <mat-label>Search...</mat-label>
        <input matInput placeholder="Jurassic World,..." type="search">
        <button matSuffix mat-icon-button>
          <mat-icon>search</mat-icon>
        </button>
      </mat-form-field>
      <button mat-flat-button class="navbar-account-button">
        <mat-icon style="margin:0; transform:scale(1.5);">account_circle</mat-icon>
      </button>
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