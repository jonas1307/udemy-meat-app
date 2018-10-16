import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { NotificationService } from '../notification.service'
import { timer } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({ opacity: 0, bottom: '0px' })),
      state('visible', style({ opacity: 0.8, bottom: '30px' })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  snackVisibility: string = 'hidden'
  message: string = 'Hello there!'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier.pipe(
      tap(message => {
        this.message = message
        this.snackVisibility = 'visible'
      }),
      switchMap(() => timer(3000))
    ).subscribe(() => this.snackVisibility = 'hidden')
  }
}
