import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      // Perform actual login validation here.
      // If login is successful, navigate to admin home.
      // If login fails, show an error message.
      // For now, let's simulate a successful login.
      if (username === 'admin' && password === 'password') {
        alert('Login successful');
        // Redirect to admin home or perform the desired action.
      } else {
        alert('Login failed. Invalid username or password.');
      }
    } else {
      // Form is invalid. You can handle this case, e.g., display error messages.
    }
  }
}
