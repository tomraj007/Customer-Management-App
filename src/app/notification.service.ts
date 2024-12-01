import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<{ message: string; type: 'success' | 'error' }>();
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });
  }

  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });
  }
}
