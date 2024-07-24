import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppService } from './app.service';
import { User } from '../model/User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private appSer: AppService) {}

  title = 'my-angular-app';

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.appSer.getUsers();
  }
  save() {
    console.log(this.users);
  }
}
