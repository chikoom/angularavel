import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.rolesService.all().subscribe(roles => { this.roles = roles })
  }

  deleteRole(roleID: number): void {
    if (confirm('Really DELETE user?')) {
      this.rolesService.delete(roleID).subscribe(() => {
        this.roles = this.roles.filter(role => role.id !== roleID);
      });
    }
  }

}
