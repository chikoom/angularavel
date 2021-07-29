import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/permission';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  rolesForm = this.formBuilder.group({
    name: '',
    permissions: this.formBuilder.array([])
  });

  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionsService,
    private roleService: RolesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.permissionService.all().subscribe(permissions => {
      this.permissions = permissions;
      this.permissions.forEach(permission => {
        this.permissionsArray.push(
          this.formBuilder.group({
            value: false,
            id: permission.id,
          })
        );
      })
    });
  }

  get permissionsArray(): FormArray {
    return this.rolesForm.get('permissions') as FormArray;
  }

  roleSubmit(): void {
    const formData = this.rolesForm.getRawValue();
    const data = {
      name: formData.name,
      permissions: formData.permissions.filter((permission: any) => permission.value === true).map((permission: any) => permission.id)
    }

    this.roleService.create(data).subscribe(() => {
      this.router.navigate(['/roles'])
    })

  }

}
