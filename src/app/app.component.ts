import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserComponent } from "./features/user/user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    UserComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  title = 'my-angular-app';
}
