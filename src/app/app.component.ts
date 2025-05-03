import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelComponent } from './lazy-loaded/tabel/tabel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabelComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tema2';
}
