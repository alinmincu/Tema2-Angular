import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    { provide: NZ_I18N, useValue: en_US }
  ]
}).catch(err => console.error(err));
