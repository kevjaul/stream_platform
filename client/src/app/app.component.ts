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
  styleUrls:["./styles/navbar.scss","./styles/sidenav.scss"],
  template: `
    <mat-toolbar style="padding-right:0">
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

    <main>
      <div class="sidenav-trigger" fxShow fxHide.gt-sm>
        <div class="sidenav-trigger-shadow">
        </div>
        <div class="sidenav-bars">
          <span class="sidenav-bar"></span>
          <span class="sidenav-bar"></span>
          <span class="sidenav-bar"></span>
        </div>
        <p> MENU </p>
        <div class="sidenav">
          <ul>
            @for (menuitem of menus; track menuitem) {
              <li><p>{{menuitem.text}}</p></li>
            }
          </ul>
        </div>
      </div>
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