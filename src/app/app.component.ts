import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CustomerManagementApp';
}
