import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: { class: 'app-root' }
})
export class AppComponent {
  state$: any;
  user$;
  messages$;
  messages: any;
  user: any;
  showSpinner: boolean;
  constructor(
    private store: Store<{ user: any; message: any; loading: boolean }>,
    private snackBar: MatSnackBar
  ) {
    this.user$ = store.pipe(select('user')).subscribe(data => {
      this.user = data;
    });
    this.messages$ = store.pipe(select('message')).subscribe(data => {
      if (data) {
        this.openSnackBar(data.text, data.type);
      }
    });
    this.user$ = store.pipe(select('loading')).subscribe(data => {
      this.showSpinner = data;
    });
  }

  openSnackBar(message: string, classList: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      panelClass: classList
    });
  }
}
