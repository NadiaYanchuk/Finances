import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs'

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
