import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../public.component.css']
})
export class RegisterComponent implements OnInit {

  formData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.register(this.formData).subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

}
