import { Injectable } from '@angular/core';
import { User } from '../model/User';
import userData from '../assets/users.json';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getUsers(): User[] {
    return userData as unknown as User[];
  }
}
