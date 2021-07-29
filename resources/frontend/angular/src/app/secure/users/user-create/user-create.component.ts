import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    email: '',
    role_id: ''
  });

  roles: Role[] = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected rolesService: RolesService,
    protected userService: UsersService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.rolesService.all().subscribe(roles => {
      this.roles = roles;
    })
  }

  createUserSubmit(): void {

    this.userService.create(this.userForm.getRawValue()).subscribe(user => {
      this.router.navigate(['/users']);
    });
  }

}
