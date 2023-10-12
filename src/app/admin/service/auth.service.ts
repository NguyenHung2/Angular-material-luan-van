import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedFlag: boolean = false; // Renamed the variable to avoid duplication

  constructor() {}

  // Simulated login logic (replace with your actual authentication logic)
  login(username: string, password: string): boolean {
    // Simulate successful login if username is 'admin' and password is 'password'
    if (username === 'admin' && password === 'password') {
      this.isAuthenticatedFlag = true;
      return true;
    }
    return false;
  }

  // Logout the user
  logout(): void {
    this.isAuthenticatedFlag = false;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }
}
