import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="notification" [ngClass]="type">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  message: string = '';
  type: 'success' | 'error' = 'success';
  isVisible: boolean = false;

  private notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notificationSubscription = this.notificationService.notification$.subscribe(
      (notification) => {
        this.message = notification.message;
        this.type = notification.type;
        this.isVisible = true;

        // Auto-hide notification after 3 seconds
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
      }
    );
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
