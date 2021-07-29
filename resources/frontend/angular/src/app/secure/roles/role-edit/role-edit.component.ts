import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/permission';
import { PermissionsService } from 'src/app/services/permissions.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  rolesForm = this.formBuilder.group({
    name: '',
    permissions: this.formBuilder.array([])
  });

  roleID!: number;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionsService,
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roleID = this.route.snapshot.params.id

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

    this.roleService.getByID(this.roleID).subscribe(role => {
      console.log(role)
      const permissionsValues = this.permissions.map((permission: Permission) => ({
        value: role.permissions.some((rolePermission: any) => permission.id === rolePermission.id),
        id: permission.id,
      }))
      this.rolesForm.patchValue({
        name: role.name,
        permissions: permissionsValues
      })
    })
  }

  roleEdit(): void {
    const formData = this.rolesForm.getRawValue();
    const data = {
      name: formData.name,
      permissions: formData.permissions.filter((permission: any) => permission.value === true).map((permission: any) => permission.id)
    }

    this.roleService.update(this.roleID, data).subscribe(() => {
      this.router.navigate(['/roles'])
    })

  }

  get permissionsArray(): FormArray {
    return this.rolesForm.get('permissions') as FormArray;
  }


}
