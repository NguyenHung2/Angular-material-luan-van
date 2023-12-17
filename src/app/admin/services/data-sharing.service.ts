// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private loggedInUserSource = new Subject<User | null>();
  loggedInUser$ = this.loggedInUserSource.asObservable();

  updateLoggedInUser(user: User | null) {
    this.loggedInUserSource.next(user);
  }
}
