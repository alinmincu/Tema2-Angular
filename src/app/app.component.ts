import { Component } from '@angular/core';
import { TabelComponent } from './lazy-loaded/tabel/tabel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabelComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'tema2';
}
