import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Auth } from 'src/app/classes/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    email: '',
  });

  passwordForm = this.formBuilder.group({
    password: '',
    password_confirm: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      user => {
        this.profileForm.patchValue(user);
      }
    );
  }

  onSubmitProfile(): void {
    this.authService.updateUserInfo(this.profileForm.getRawValue()).subscribe((user) => {
      console.log(user);
      Auth.userEmitter.emit(user);
    });
  }

  onSubmitPassword(): void {
    this.authService.updateUserPassword(this.passwordForm.getRawValue()).subscribe((res) => {
      console.log(res);
    });
  }

}
