import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    email: '',
    role_id: ''
  });

  roles: Role[] = [];
  userID!: number;

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rolesService.all().subscribe(roles => {
      this.roles = roles;
    })
    this.userID = this.route.snapshot.params.id
    this.userService.getByID(this.userID).subscribe(user => {
      this.userForm.patchValue({
        ...user,
        role_id: user.role.id
      });
    })
  }

  editUserSubmit(): void {
    this.userService.update(this.userID, this.userForm.getRawValue()).subscribe(user => {
      this.router.navigate(['/users']);
    });
  }
}
